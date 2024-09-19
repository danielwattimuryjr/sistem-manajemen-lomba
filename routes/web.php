<?php

use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
})->name('welcome');

Route::get('/redirect', [DashboardController::class, 'index'])->name('redirect');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

//     Route::resource('competitions', CompetitionController::class)->parameters([
//         'competition' => 'slug'
//     ]);
// });

Route::prefix('/admin')->name('dashboard.')->group(function () {
  Route::get('/', function () {
    return Inertia::render('admin/dashboard');
  })->name('home');

  Route::resource('levels', LevelController::class)->scoped([
    'level' => 'slug'
  ]);
  Route::resource('competitions', CompetitionController::class)->scoped([
    'competition' => 'slug'
  ]);
  Route::resource('users', UserController::class);
});

require __DIR__ . '/auth.php';
