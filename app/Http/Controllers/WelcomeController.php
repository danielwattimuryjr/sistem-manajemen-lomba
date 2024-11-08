<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompetitionResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
  public function __invoke()
  {
    $competitions = CompetitionResource::collection(
      Competition::where('is_active', true)
        ->withCount('participants')
        ->orderBy('created_at', 'desc')
        ->take(2)
        ->get()
    );

    return Inertia::render('welcome', [
      'competitions' => fn() => $competitions,
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
    ]);
  }
}
