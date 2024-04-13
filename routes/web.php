<?php

use App\Http\Controllers\AdminManagementController;
use App\Http\Controllers\CancelParticipationQueueController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('welcome');

Route::get('/frequently-ask-question', function () {
    return Inertia::render('Public/Faq');
})->name('faq');

Route::get('/contact-us', function () {
    return Inertia::render('Public/Contact');
})->name('contact-us');

Route::prefix('/perlombaan/')->controller(GuestController::class)
    ->name('public.perlombaan.')->group(function () {

        Route::get('/', 'getActivePerlombaan')->name('all');
        Route::get('/{contest:slug}', 'getPerlombaanDetail')->name('detail');
        Route::middleware(['auth'])->group(function () {
            Route::post('/{contest:slug}', 'assignUserToContest')->name('participate');
        });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::patch('/profile', [ProfileController::class, 'saveData'])->name('profile.update');
});

Route::prefix('/admin/')->middleware('auth')->group(function () {
    // ADMIN / SUPERADMIN Can access
    Route::middleware('role:ADMIN|SUPERADMIN')->group(function () {

        // Ke halaman dashboard milik admin
        Route::get('/dashboard', function () {
            return Inertia::render('Private/AdminDashboard');
        })->name('admin.dashboard');

        Route::resources([
            // Routes untuk manajemen lomba
            'perlombaan' => ContestController::class,
        ], [
            'parameters' => [
                'perlombaan' => 'contest:slug',
            ]
        ]);
    });

    // Only SUPERADMIN
    Route::middleware('role:SUPERADMIN')->group(function () {
        Route::resources([
            // Routes untuk manajemen Admin
            'admin-management' => AdminManagementController::class
        ], [
            'parameters' => [
                'admin-management' => 'user:uuid'
            ],
            'except' => [
                'admin-management' => 'show'
            ]
        ]);
    });
});


require __DIR__ . '/auth.php';
