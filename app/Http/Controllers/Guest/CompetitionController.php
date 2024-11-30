<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionParticipantResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\CompetitionScoreEntryResource;
use App\Http\Resources\GuestCompetitionResource;
use App\Http\Resources\SingleCompetitionResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompetitionController extends Controller
{
  private function generateParticipantCode(Competition $competition)
  {
    $words = explode(' ', $competition->name);
    $acronym = '';

    foreach ($words as $word) {
      $acronym .= strtoupper(substr($word, 0, 1));
    }

    $currentCount = $competition->participants()->count() + 1;

    $numberPart = str_pad($currentCount, 3, '0', STR_PAD_LEFT);

    return $acronym . '-' . $numberPart;
  }

  public function index(Request $request)
  {
    $user = Auth::user();

    $competitions = GuestCompetitionResource::collection(
      DB::table('competition_level')
        ->join('competitions', 'competition_level.competition_id', '=', 'competitions.id')
        ->leftJoin('participants', 'participants.competition_id', '=', 'competitions.id')
        ->select(
          'competitions.name',
          'competitions.slug',
          'competitions.start_date',
          'competitions.end_date',
          DB::raw('COUNT(participants.id) as participants_count')
        )
        ->where('competitions.is_active', true)
        ->when($user, function ($query) use ($user) {
          return $query->where('competition_level.level_id', $user->level_id);
        })
        ->orderBy('competitions.created_at', 'DESC')
        ->groupBy(
          'competitions.id',
          'competitions.name',
          'competitions.slug',
          'competitions.start_date',
          'competitions.end_date'
        )
        ->get()
    );

    return Inertia::render('competitions/index', [
      'competitions' => fn() => $competitions,
      'state' => $request->only('search'),
    ]);
  }

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

    $competition = new SingleCompetitionResource($competition);

    $participants = CompetitionParticipantResource::collection($competition->participants);

    $scoreEntries = $competition->scoreEntries->groupBy('participant_id')->map(function ($entries, $participantId) {
      return CompetitionScoreEntryResource::collection($entries);
    });

    return Inertia::render('competitions/show', [
      'competition' => $competition,
      'participants' => $participants,
      'scoreEntries' => $scoreEntries,
      'state' => $request->only('search'),
    ]);
  }

  public function postParticipantData(Competition $competition)
  {
    $user = Auth::user();

    $participantCode = $this->generateParticipantCode($competition);

    $competition->participants()->attach($user->id, [
      'kd_peserta' => $participantCode
    ]);

    return to_route('guest.competitions.index');
  }
}
