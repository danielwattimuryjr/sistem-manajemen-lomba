<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Http\Resources\CompetitionParticipantResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\CompetitionScoreEntryResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\SingleCompetitionResource;
use App\Http\Resources\UserResource;
use App\Mail\FinalScoreNotification;
use App\Models\Competition;
use App\Models\Level;
use App\Models\User;
use App\Services\CompetitionService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class CompetitionController extends Controller
{
  protected $competitionService;

  public function __construct(CompetitionService $competitionService)
  {
    $this->competitionService = $competitionService;
  }

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

    return Inertia::render('superadmin/competitions/competition-list/index', [
      'competitions' => fn() => $competitions,
      'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCompetitionRequest $request)
  {
    $validated = $request->validated();

    DB::transaction(function () use ($validated) {
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
    });

    return to_route('dashboard.superadmin.competitions.index');
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
      User::where('role', 'judges')
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('superadmin/competitions/competition-form/index', [
      'levels' => $levels,
      'judges' => $judges
    ]);
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
      'scoreEntries',
      'participants' => function ($query) use ($request) {
        $query->when($request->search, function ($q, $value) {
          $q->where('users.name', 'like', '%' . $value . '%')
            ->orWhere('users.email', 'like', '%' . $value . '%');
        })
          ->orderBy('participants.created_at', 'DESC');
      }
    ]);

    $participants = CompetitionParticipantResource::collection($competition->participants);

    $scoreEntries = $competition->scoreEntries->groupBy('participant_id')->map(function ($entries, $participantId) {
      return CompetitionScoreEntryResource::collection($entries);
    });

    return Inertia::render('superadmin/competitions/show-competition-details/index', [
      'competition' => new SingleCompetitionResource($competition),
      'participants' => $participants,
      'scoreEntries' => $scoreEntries,
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

    return Inertia::render('superadmin/competitions/competition-form/index', [
      'initialData' => $initialData,
      'levels' => $roles,
      'judges' => $judges
    ]);
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

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCompetitionRequest $request, Competition $competition)
  {
    $validated = $request->validated();

    DB::transaction(function () use ($validated, $competition) {
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
    });

    return to_route('dashboard.superadmin.competitions.index');
  }

  public function calculateFinalScores(Competition $competition)
  {
    try {
      if (!$this->allParticipantHaveScore($competition)) {
        return response()->json([
          'success' => false,
          'message' => 'Tidak semua peserta memiliki skor. Harap pastikan semua skor sudah diinput.',
        ], 400);
      }

      $results = $this->competitionService->calculateAndSaveScores($competition);

      $competition->update([
        'is_active' => false,
        'has_final_scores' => true
      ]);

      foreach ($competition->participants as $participant) {
        Mail::to($participant->email)->queue(new FinalScoreNotification(
          $competition,
          $participant->name
        ));
      }

      return to_route('guest.competitions.leaderboard', $competition);
    } catch (Exception $e) {
      return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
    }
  }

  private function allParticipantHaveScore(Competition $competition): bool
  {
    $totalParticipants = $competition->participants()->count();

    $participantsWithScores = $competition->scoreEntries()
      ->distinct('participant_id')
      ->count('participant_id');

    return $totalParticipants === $participantsWithScores;
  }
}
