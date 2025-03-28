<?php
use App\Http\Controllers\Superadmin\CompetitionController as SuperadminCompetitionController;
use App\Http\Controllers\Superadmin\LevelController as SuperadminLevelController;
use App\Http\Controllers\Superadmin\ScoreEntryController;
use App\Http\Controllers\Superadmin\UserController as SuperadminUserController;
use App\Http\Controllers\Superadmin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'roles:admin,superadmin'])
  ->prefix('admin-panel')
  ->name('dashboard.')
  ->group(function () {
    // Admin Dashboard
    Route::get(
      '/',
      DashboardController::class
    )->name('home');

    // Admin Routes
    Route::prefix('admin')
      ->name('admin.')
      ->group(function () {
      // Competition Management
      Route::resource(
        'competitions',
        SuperadminCompetitionController::class
      )->scoped(['competition' => 'slug']);

      // Score Entry Management
      Route::prefix('score-entries')
        ->name('score-entries.')
        ->controller(ScoreEntryController::class)
        ->group(function () {
        Route::get(
          '{competition:slug}/{participant:username}',
          'create'
        )->name('create');
        Route::post(
          '{competition:slug}/{participant:username}',
          'store'
        )->name('store');
      });
    });

    // Superadmin Routes
    Route::prefix('superadmin')
      ->name('superadmin.')
      ->group(function () {
      // Level Management
      Route::resource(
        'levels',
        SuperadminLevelController::class
      )->scoped(['level' => 'slug']);

      // User Management
      Route::post(
        'users/ids',
        [SuperadminUserController::class, 'getAllUserId']
      )->name('users.ids');
      Route::patch(
        'users/bulk-verify',
        [SuperadminUserController::class, 'bulkVerifyUser']
      )->name('users.bulk-verify');
      Route::resource(
        'users',
        SuperadminUserController::class
      )->scoped(['user' => 'username']);

      // Competition Management
      Route::resource(
        'competitions',
        SuperadminCompetitionController::class
      )->except(['edit', 'update'])
        ->scoped(['competition' => 'slug']);

      Route::prefix('competitions/{competition:slug}')
        ->name('competitions.')
        ->group(function () {
          Route::middleware(['hasFinalScores'])
            ->group(function () {
              Route::get('edit', [SuperadminCompetitionController::class, 'edit'])->name('edit');
              Route::patch('/', [SuperadminCompetitionController::class, 'update'])->name('update');
            });

          Route::patch(
            'update-competition-status',
            [SuperadminCompetitionController::class, 'updateCompetitionStatus']
          )->name('update-status');

          Route::post(
            'calculate-final-scores',
            [SuperadminCompetitionController::class, 'calculateFinalScores']
          )->name('calculate-final-scores');
        });

    });
  });
