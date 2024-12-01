<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCompetitionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MyCompetitionController extends Controller
{
    public function __invoke(Request $request)
    {
      $user = Auth::user();

      $userCompetitions = $user
        ? UserCompetitionResource::collection(
          DB::table('participants')
            ->join('competitions', 'participants.competition_id', '=', 'competitions.id')
            ->join('final_scores', 'participants.id', '=', 'final_scores.participant_id')
            ->select(
              'participants.created_at as joined_at',
              'participants.kd_peserta as participant_code',
              'competitions.name as competition_name',
              'competitions.slug as competition_slug',
              'competitions.start_date as competition_start_at',
              'competitions.end_date as competition_end_at',
              'final_scores.total_score as final_score',
              'final_scores.rank as rank',
              'competitions.has_final_scores'
            )
            ->where('participants.user_id', $user->id)
            ->when($request->has('search'), function ($query) use ($request) {
              return $query->where('competitions.name', $request->search);
            })
            ->get()
        )
        : null;

      return Inertia::render('my-competitions/index', [
        'userCompetitions' => fn() => $userCompetitions,
      ]);
    }
}
