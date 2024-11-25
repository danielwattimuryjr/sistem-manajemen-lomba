<?php

use App\Http\Controllers\Admin\CompetitionController as AdminCompetitionController;
use App\Http\Controllers\Admin\LevelController as AdminLevelController;
use App\Http\Controllers\Admin\ScoreEntryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Guest\CompetitionController as GuestCompetitionController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome Page
Route::get(
  '/',
  WelcomeController::class
)->name('welcome');

// Redirect Dashboard
Route::get(
  '/redirect',
  [DashboardController::class, 'index']
)->name('redirect');

// Guest Routes
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
      ->middleware('auth');
  });

// Admin and Superadmin Routes
Route::middleware(['auth', 'verified', 'roles:admin,superadmin'])
  ->prefix('admin-panel')
  ->name('dashboard.')
  ->group(function () {
    // Admin Dashboard
    Route::get(
      '/',
      fn() => Inertia::render('admin/dashboard')
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
        )->scoped(['level' => 'slug']);

        // User Management
        Route::resource(
          'users',
          AdminUserController::class
        )->scoped(['user' => 'username']);

        // Competition Management
        Route::resource(
          'competitions',
          AdminCompetitionController::class
        )->scoped(['competition' => 'slug']);

        Route::prefix('competitions/{competition:slug}')
          ->name('competitions.')
          ->group(function() {
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

// Auth Routes
require __DIR__ . '/auth.php';
