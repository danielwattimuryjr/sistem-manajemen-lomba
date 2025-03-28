<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScoreEntryRequest;
use App\Http\Resources\ScoreEntryFormResource;
use App\Models\Competition;
use App\Models\Participant;
use App\Models\ScoreEntry;
use App\Models\User;
use Inertia\Inertia;

class ScoreEntryController extends Controller
{
  public function create(Competition $competition, User $participant)
  {
    $competition->load(['criterias']);
    $competitionData = new ScoreEntryFormResource($competition, $participant);

    return Inertia::render('admin/competitions/score-entry/index', [
      'data' => $competitionData,
    ]);
  }

  public function store(StoreScoreEntryRequest $request, Competition $competition, User $participant)
  {
    $validated = $request->validated();

    $participantId = Participant::where([
      'user_id' => $participant->id,
      'competition_id' => $competition->id
    ])->value('id');

    $scoreEntries = collect($validated['criterias'])->map(function ($item) use ($participantId) {
      return [
        'participant_id' => $participantId,
        'criteria_id' => $item['id'],
        'score' => $item['score']
      ];
    })->toArray();

    foreach ($scoreEntries as $scoreEntry) {
      ScoreEntry::updateOrCreate(
        ['participant_id' => $scoreEntry['participant_id'], 'criteria_id' => $scoreEntry['criteria_id']],
        ['score' => $scoreEntry['score']]
      );
    }

    return to_route('dashboard.admin.competitions.show', $competition);
  }
}
