<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompetitionResource;
use App\Http\Resources\UserCompetitionResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
  public function __invoke()
  {
    $user = Auth::user();

    $competitions = CompetitionResource::collection(
      Competition::where('is_active', true)
        ->withCount('participants')
        ->orderBy('created_at', 'desc')
        ->take(2)
        ->get()
    );

    if ($user) {
      $userCompetitions = UserCompetitionResource::collection(
        $user->participants()->take(2)->get()
      );
    } else {
      $userCompetitions = null;
    }

    return Inertia::render('welcome/index', [
      'competitions' => fn() => $competitions,
      'userCompetitions' => fn() => $userCompetitions,
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
    ]);
  }
}
