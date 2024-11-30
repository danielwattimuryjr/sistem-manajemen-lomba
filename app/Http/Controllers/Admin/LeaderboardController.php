<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SingleCompetitionResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function __invoke(Competition $competition)
    {
      $competition->load([
        'finalScores.participant.user'
      ]);

      return Inertia::render('admin/competitions/leaderboard/index', [
        'competition' => new SingleCompetitionResource($competition),
        'finalScores' => $competition->finalScores
      ]);
    }
}
