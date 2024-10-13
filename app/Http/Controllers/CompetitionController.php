<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\UserResource;
use App\Models\Competition;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

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

    $competitions = CompetitionResource::collection(
      Competition::query()
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

    return Inertia::render('admin/competitions/index', [
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

    return Inertia::render('admin/competitions/form', [
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
        'description' => $validated['description'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
        'is_active' => true
      ]);

      $competition->judges()->attach($validated['judges']);
      $competition->levels()->attach($validated['levels']);
      foreach ($validated['assessment_factors'] as $criteria) {
        $competition->criterias()->create([
          'name' => $criteria['name'],
          'weight' => $criteria['weight']
        ]);
      }
      DB::commit();

      return to_route('dashboard.competitions.index');
    } catch (\Throwable $th) {
      DB::rollBack();
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Competition $competition)
  {
    return response()->json($competition);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Competition $competition)
  {
    $roles = Level::orderBy('created_at', 'ASC')
      ->get(['id', 'name']);
    return response()->json([$competition, $roles]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCompetitionRequest $request, Competition $competition)
  {

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Competition $competition)
  {
    $competition->delete();
  }
}
