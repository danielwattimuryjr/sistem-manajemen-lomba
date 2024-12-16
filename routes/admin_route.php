<?php
use App\Http\Controllers\Admin\CompetitionController as AdminCompetitionController;
use App\Http\Controllers\Admin\LevelController as AdminLevelController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ScoreEntryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use Inertia\Inertia;
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
          AdminCompetitionController::class
        )->scoped(['competition' => 'slug']);

        // Score Entry Management
        Route::prefix('score-entries')
          ->name('score-entries.')
          ->controller(ScoreEntryController::class)
          ->group(function () {
            Route::get(
              '{competition:slug}/{participant:username}',
              'create')->name('create');
            Route::post(
              '{competition:slug}/{participant:username}',
              'store')->name('store');
          });
      });

    // Superadmin Routes
    Route::prefix('superadmin')
      ->name('superadmin.')
      ->group(function () {
        // Level Management
        Route::resource(
          'levels',
          AdminLevelController::class
        )->except(['show'])->scoped(['level' => 'slug']);

        // User Management
        Route::post(
          'users/ids',
          [AdminUserController::class, 'getAllUserId']
        )->name('users.ids');
        Route::patch(
          'users/bulk-verify',
          [AdminUserController::class, 'bulkVerifyUser']
        )->name('users.bulk-verify');
        Route::resource(
          'users',
          AdminUserController::class
        )->except(['show'])->scoped(['user' => 'username']);

        // Competition Management
        Route::resource(
          'competitions',
          AdminCompetitionController::class
        )->except(['edit', 'update'])
          ->scoped(['competition' => 'slug']);

        Route::prefix('competitions/{competition:slug}')
          ->name('competitions.')
          ->group(function() {
            Route::middleware(['hasFinalScores'])
              ->group(function() {
                Route::get('edit', [AdminCompetitionController::class, 'edit'])->name('edit');
                Route::patch('/', [AdminCompetitionController::class, 'update'])->name('update');
              });

            Route::patch(
              'update-competition-status',
              [AdminCompetitionController::class, 'updateCompetitionStatus']
            )->name('update-status');

            Route::post(
              'calculate-final-scores',
              [AdminCompetitionController::class, 'calculateFinalScores']
            )->name('calculate-final-scores');
          });

      });
  });
