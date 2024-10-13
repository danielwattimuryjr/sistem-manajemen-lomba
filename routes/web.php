<?php

use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
})->name('welcome');

Route::get('/redirect', [DashboardController::class, 'index'])->name('redirect');

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
  Route::resource('users', UserController::class)->scoped([
    'user' => 'username'
  ]);
});

require __DIR__ . '/auth.php';
