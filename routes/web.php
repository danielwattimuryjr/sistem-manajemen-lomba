<?php

use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

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

Route::get('/sign-in', function () {
    return to_route('login');
})->name('sign-in');

Route::prefix('/admin')->name('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('home');
});

require __DIR__ . '/auth.php';
