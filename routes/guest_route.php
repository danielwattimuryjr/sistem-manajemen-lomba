<?php

use App\Http\Controllers\Admin\LeaderboardController;
use App\Http\Controllers\Guest\CompetitionController as GuestCompetitionController;
use App\Http\Controllers\Guest\MyCompetitionController;
use App\Http\Controllers\ProfileController;
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
      ->middleware(['auth', 'isEligible', 'isVerified']);
    Route::get(
      '{competition:slug}/leaderboard',
      LeaderboardController::class
    )->name('leaderboard');
  });

Route::middleware(['auth'])->group(function () {
  Route::prefix('profiles')
    ->name('profiles.')
    ->controller(ProfileController::class)
    ->group(function () {
      Route::get(
        '/',
        'index'
      )->name('index');
      Route::get(
        'edit',
        'edit'
      )->name('edit');
      Route::patch(
        'edit',
        'update'
      )->name('update');
      Route::delete(
        'delete',
        'destroy'
      )->name('destroy');
    });

  Route::get('my-competitions', MyCompetitionController::class)->name('my-competitions');
});
