<?php

use App\Http\Controllers\AdminManagementController;
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
            Route::get('/{contest:slug}/pendaftaran', 'openFormPendaftaran')->name('form-daftar');
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

        // Routes untuk manajemen lomba
        Route::controller(ContestController::class)->prefix('/contest')
            ->name('perlombaan.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/edit/{contest:slug}', 'edit')->name('edit');
                Route::get('/create', 'create')->name('create');
                Route::get('/detail/{contest:slug}', 'show')->name('show');
                Route::post('/create', 'store')->name('store');
                Route::patch('/update/{contest:slug}', 'update')->name('update');
                Route::delete('/delete/{contest:slug}', 'destroy')->name('destroy');
            });
    });

    // Only SUPERADMIN
    Route::middleware('role:SUPERADMIN')->group(function () {
        // Routes untuk manajemen Admin
        Route::controller(AdminManagementController::class)->prefix('/manage-admin')
            ->name('admin-management.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/edit/{user:uuid}', 'edit')->name('edit');
                Route::get('/create', 'create')->name('create');
                // Route::get('/detail/{user:uuid}', 'show')->name('show');
                Route::post('/create/', 'store')->name('store');
                Route::patch('/update/{user:uuid}', 'update')->name('update');
                Route::delete('/delete/{user:uuid}', 'destroy')->name('destroy');
            });

    });

});

require __DIR__ . '/auth.php';
