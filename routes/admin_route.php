<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CompetitionController as AdminCompetitionController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\LevelController as AdminLevelController;

Route::middleware(['auth', 'verified', 'roles:admin'])
  ->prefix('admin-panel/admin')
  ->name('dashboard.admin.')
  ->group(function () {
    // Competition Management
    Route::resource(
      'competitions',
      AdminCompetitionController::class
    )->except(['destroy'])->scoped(['competition' => 'slug']);

    Route::resource(
      'levels',
      AdminLevelController::class
    )->only(['index']);

    Route::resource(
      'users',
      AdminUserController::class
    )->only(['index']);

    // // Score Entry Management
    // Route::prefix('score-entries')
    //   ->name('score-entries.')
    //   ->controller(ScoreEntryController::class)
    //   ->group(function () {
    //   Route::get(
    //     '{competition:slug}/{participant:username}',
    //     'create'
    //   )->name('create');
    //   Route::post(
    //     '{competition:slug}/{participant:username}',
    //     'store'
    //   )->name('store');
    // });
  });