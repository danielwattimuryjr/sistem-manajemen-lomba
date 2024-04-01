<?php

use App\Http\Controllers\ContestController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing.page');

Route::prefix('/perlombaan/')->controller(GuestController::class)
    ->name('public.perlombaan.')->group(function () {

        Route::get('/',  'getActivePerlombaan')->name('all');
        Route::get('/{contest:slug}',  'getPerlombaanDetail')->name('detail');
        Route::middleware(['auth'])->group(function () {
            Route::get('/{contest:slug}/pendaftaran', 'openFormPendaftaran')->name('form-daftar');
        });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/admin/')->middleware(['auth', 'role:ADMIN'])->name('perlombaan.')
    ->group(function () {
        Route::controller(ContestController::class)->group(function () {
            Route::get('/contest', 'index')->name('index');
            Route::get('/contest/edit/{contest:slug}', 'edit')->name('edit');
            Route::get('/contest/create', 'create')->name('create');
            Route::get('/contest/detail/{contest:slug}', 'show')->name('show');
            Route::post('/contest/create', 'store')->name('store');
            Route::patch('/contest/update/{contest:slug}', 'update')->name('update');
            Route::delete('/contest/delete/{contest:slug}', 'destroy')->name('destroy');
        });
});

require __DIR__.'/auth.php';
