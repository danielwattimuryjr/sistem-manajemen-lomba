<?php

use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\Guest\CompetitionController as GuestCompetitionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', WelcomeController::class)->name('welcome');

Route::get('/redirect', [DashboardController::class, 'index'])->name('redirect');

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

Route::middleware(['auth', 'verified', 'roles:superadmin'])->prefix('/admin')->name('dashboard.')->group(function () {
  Route::get('/', function () {
    return Inertia::render('admin/dashboard');
  })->name('home');

  Route::resource('levels', LevelController::class)->scoped([
    'level' => 'slug'
  ]);
  Route::resource('competitions', CompetitionController::class)->scoped([
    'competition' => 'slug'
  ]);
  Route::patch(
    'competitions/{competition:slug}/update-competition-status',
    [CompetitionController::class, 'updateCompetitionStatus']
  )->name('competitions.update-status');
  Route::resource('users', UserController::class)->scoped([
    'user' => 'username'
  ]);
});

require __DIR__ . '/auth.php';
