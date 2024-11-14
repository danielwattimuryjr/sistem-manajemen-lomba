<?php

use App\Http\Controllers\Admin\CompetitionController as AdminCompetitionController;
use App\Http\Controllers\Admin\LevelController as AdminLevelController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

use App\Http\Controllers\Guest\CompetitionController as GuestCompetitionController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('', WelcomeController::class)->name('welcome');

Route::get('redirect', [DashboardController::class, 'index'])->name('redirect');

Route::name('guest.')->group(function () {
  // Route::resource('competitions', GuestCompetitionController::class)->scoped([
  //   'competition' => 'slug'
  // ]);
  Route::controller(GuestCompetitionController::class)
    ->name('competitions.')
    ->prefix('competitions')
    ->group(function () {
      Route::get('', 'index')->name('index');
      Route::get('{competition:slug}', 'show')->name('show');
      Route::post('{competition:slug}/participate', 'postParticipantData')->name('participate')->middleware('auth');
    });
});

Route::middleware(['auth', 'verified'])
  ->prefix('admin-panel')
  ->name('dashboard.')
  ->group(function () {
    Route::get('/', function () {
      return Inertia::render('admin/dashboard');
    })->name('home');

    /**
     * SUPERADMIN ROUTES
     */
    Route::middleware(['roles:superadmin'])
      ->prefix('superadmin')
      ->name('superadmin.')
      ->group(function () {
        // LEVEL MANAGEMENT
        Route::resource('levels', AdminLevelController::class)->scoped([
          'level' => 'slug'
        ]);

        // USER MANAGEMENT
        Route::resource('users', AdminUserController::class)->scoped([
          'user' => 'username'
        ]);

        // COMPETITION MANAGEMENT
        Route::resource('competitions', AdminCompetitionController::class)->scoped([
          'competition' => 'slug'
        ]);
        Route::patch(
          'competitions/{competition:slug}/update-competition-status',
          [AdminCompetitionController::class, 'updateCompetitionStatus']
        )->name('competitions.update-status');
      });

    /**
     * ADMIN ROUTES
     */
    Route::middleware(['roles:admin'])
      ->prefix('admin')
      ->name('admin.')
      ->group(function () {
        // COMPETITION MANAGEMENT
        Route::resource('competitions', AdminCompetitionController::class)->scoped([
          'competition' => 'slug'
        ]);
      });
  });

require __DIR__ . '/auth.php';
