<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Http\Resources\CompetitionParticipantResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\SingleCompetitionResource;
use App\Http\Resources\UserResource;
use App\Models\Competition;
use App\Models\Judge;
use App\Models\Judgement;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class CompetitionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $request->validate([
      'field' => Rule::in(['updated_at', 'created_at', 'name', 'started_at', 'is_active', 'start_date', 'end_date']),
      'direction' => Rule::in(['asc', 'desc'])
    ]);
    $limit = $request->input('limit', 10);

    $user = Auth::user();
    $baseCompetition = Competition::query();
    if ($user->role === 'admin') {
      $baseCompetition = $user->competitions();
    }

    $competitions = CompetitionResource::collection(
      $baseCompetition
        ->when(
          value: $request->search,
          callback: fn($query, $value) => $query->where('name', 'like', '%' . $value . '%')
        )
        ->when(
          value: $request->field && $request->direction,
          callback: fn($query) => $query->orderBy($request->field, $request->direction),
          default: fn($query) => $query->latest()
        )
        ->fastPaginate($limit)
        ->withQueryString()
    );

    return Inertia::render('admin/competitions/competition-list/index', [
      'competitions' => fn() => $competitions,
      'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $levels = LevelResource::collection(
      Level::orderBy('name', 'ASC')->get()
    );
    $judges = UserResource::collection(
      User::where('role', 'admin')
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('admin/competitions/competition-form/index', [
      'levels' => $levels,
      'judges' => $judges
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCompetitionRequest $request)
  {
    $validated = $request->validated();

    DB::beginTransaction();
    try {
      $competition = Competition::create([
        'name' => $validated['name'],
        'slug' => $validated['slug'],
        'user_id' => $validated['user_id'],
        'description' => $validated['description'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
        'is_active' => true
      ]);

      $competition->levels()->attach($validated['levels']);
      foreach ($validated['assessment_factors'] as $criteria) {
        $competition->criterias()->create([
          'name' => $criteria['name'],
          'weight' => $criteria['weight']
        ]);
      }
      DB::commit();

      return to_route('dashboard.superadmin.competitions.index');
    } catch (Throwable $th) {
      DB::rollBack();
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Competition $competition, Request $request)
  {

    $competition->load([
      'criterias',
      'judge',
      'levels',
      'participants' => function ($query) use ($request) {
        $query->when($request->search, function ($q, $value) {
          $q->where('users.name', 'like', '%' . $value . '%')
            ->orWhere('users.email', 'like', '%' . $value . '%');
        })
          ->orderBy('participants.created_at', 'DESC');
      }
    ]);

    return Inertia::render('admin/competitions/show-competition-details/index', [
      'competition' => new SingleCompetitionResource($competition),
      'participants' => CompetitionParticipantResource::collection($competition->participants),
      'state' => $request->only('search'),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Competition $competition)
  {
    $competition->load(['criterias', 'levels']);
    $initialData = [
      'name' => $competition->name,
      'user_id' => $competition->user_id,
      'slug' => $competition->slug,
      'description' => $competition->description,
      'start_date' => $competition->start_date,
      'end_date' => $competition->end_date,
      'assessment_factors' => $competition->criterias->map(function ($criteria) {
        return [
          'name' => $criteria->name,
          'weight' => $criteria->weight,
        ];
      }),
      'levels' => $competition->levels->pluck('id')->toArray(),
    ];

    $roles = LevelResource::collection(
      Level::orderBy('name', 'ASC')->get()
    );

    $judges = UserResource::collection(
      User::where('role', 'admin')
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('admin/competitions/competition-form/index', [
      'initialData' => $initialData,
      'levels' => $roles,
      'judges' => $judges
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCompetitionRequest $request, Competition $competition)
  {
    $validated = $request->validated();

    DB::beginTransaction();
    try {
      $competition->update([
        'name' => $validated['name'],
        'user_id' => $validated['user_id'],
        'slug' => $validated['slug'],
        'description' => $validated['description'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
      ]);

      $requestedNames = collect($validated['assessment_factors'])->pluck('name')->toArray();

      foreach ($validated['assessment_factors'] as $factorData) {
        $competition->criterias()->updateOrCreate(
          ['name' => $factorData['name']],
          [
            'name' => $factorData['name'],
            'weight' => $factorData['weight'],
          ]
        );
      }
      $competition->criterias()
        ->whereNotIn('name', $requestedNames)
        ->delete();

      $competition->levels()->sync($validated['levels']);

      DB::commit();

      return to_route('dashboard.superadmin.competitions.index');
    } catch (Throwable $th) {
      DB::rollBack();
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Competition $competition)
  {
    $competition->delete();

    return to_route('dashboard.superadmin.competitions.index');
  }

  public function updateCompetitionStatus(Competition $competition, Request $request)
  {
    $validated = $request->validate([
      'isActive' => ['required', 'boolean']
    ]);

    $competition->update([
      'is_active' => $validated['isActive']
    ]);
  }
}