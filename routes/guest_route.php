<?php
use App\Http\Controllers\Guest\CompetitionController as GuestCompetitionController;
use App\Http\Controllers\Admin\LeaderboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('competitions')
  ->name('guest.competitions.')
  ->controller(GuestCompetitionController::class)
  ->group(function () {
    Route::get(
      '/',
      'index'
    )->name('index');
    Route::get(
      '{competition:slug}',
      'show')->name('show');
    Route::post(
      '{competition:slug}/participate',
      'postParticipantData'
    )->name('participate')
      ->middleware(['auth', 'isEligible']);
    Route::get(
      '{competition:slug}/leaderboard',
      LeaderboardController::class
    )->name('leaderboard');  });
