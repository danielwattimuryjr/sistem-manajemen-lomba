<?php

namespace App\Http\Controllers;

use App\Http\Resources\GuestCompetitionResource;
use App\Http\Resources\UserCompetitionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
  public function __invoke(Request $request)
  {
    $user = Auth::user();

    $competitions = GuestCompetitionResource::collection(
      DB::table('competitions')
        ->leftJoin('competition_level', 'competitions.id', '=', 'competition_level.competition_id')
        ->leftJoin('participants', 'participants.competition_id', '=', 'competitions.id') // Join with participants
        ->select(
          'competitions.name',
          'competitions.slug',
          'competitions.start_date',
          'competitions.end_date',
          DB::raw('COUNT(participants.id) as participants_count') // Count participants
        )
        ->where('competitions.is_active', true) // Only active competitions
        ->when($user, function ($query) use ($user) {
          return $query->where('competition_level.level_id', $user->level_id); // Add level condition if user exists
        })
        ->orderBy('competitions.created_at', 'DESC') // Order by creation date
        ->groupBy(
          'competitions.id',
          'competitions.name',
          'competitions.slug',
          'competitions.start_date',
          'competitions.end_date'
        )
        ->limit(4)
        ->get()
    );

    $userCompetitions = $user
      ? UserCompetitionResource::collection(
        DB::table('participants')
          ->join('competitions', 'participants.competition_id', '=', 'competitions.id')
          ->leftJoin('final_scores', 'participants.id', '=', 'final_scores.participant_id')
          ->select(
            'participants.created_at as joined_at',
            'participants.kd_peserta as participant_code',
            'competitions.name as competition_name',
            'competitions.slug as competition_slug',
            'competitions.start_date as competition_start_at',
            'competitions.end_date as competition_end_at',
            'final_scores.total_score as final_score',
            'final_scores.rank as rank',
            'final_scores.id as final_score_id',
            'competitions.has_final_scores'
          )
          ->where('participants.user_id', $user->id)
          ->when($request->has('search'), function ($query) use ($request) {
            return $query->where('competitions.name', $request->search);
          })
          ->get()
      )
      : null;

    return Inertia::render('welcome/index', [
      'competitions' => fn() => $competitions,
      'userCompetitions' => fn() => $userCompetitions,
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
    ]);
  }
}
