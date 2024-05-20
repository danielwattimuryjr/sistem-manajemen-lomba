<?php

use App\Http\Controllers\AdminManagementController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\GuestManagementController;
use App\Http\Controllers\LevelManagementController;
use App\Http\Controllers\ParticipantScoreController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('welcome');

Route::prefix('/contact-us')->controller(ContactController::class)->name('contact.')
    ->group(function () {
        Route::get('/contact-us', 'index')->name('index');
        Route::post('/contact-us', 'sendMail')->name('send-mail');
    });

Route::get('/contact-us', function () {
    return Inertia::render('Public/Contact');
})->name('send-mail');

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

// ADMIN / SUPERADMIN Can access
Route::prefix('/admin/')->middleware('auth')->group(function () {
    Route::middleware('role:ADMIN|SUPERADMIN')->group(function () {

        // Ke halaman dashboard milik admin
        Route::get('/dashboard', function () {
            return Inertia::render('Private/AdminDashboard');
        })->name('admin.dashboard');

        Route::resources([
            // Routes untuk manajemen lomba
            'perlombaan' => ContestController::class,
            'tingkat-peserta' => LevelManagementController::class,
            'guest-management' => GuestManagementController::class
        ], [
            'parameters' => [
                'perlombaan' => 'contest:slug',
                'guest-management' => 'user:uuid',
                'tingkat-peserta' => 'role'
            ]
        ]);

        Route::prefix('perlombaan/')->name('perlombaan.')
            ->group(function () {


                Route::controller(ContestController::class)->group(function () {
                    // Route untuk bulk actions                
                    Route::post(
                        '{slugs}/bulk-action/{action_type}',
                        'bulkActions'
                    )->name('bulk-action');

                    Route::patch('{contest:slug}/update_status/{status}', 'updateStatus')
                        ->name('update-status');
                });

                Route::controller(ParticipantScoreController::class)
                    ->prefix('{contest:slug}/penilaian/{user:uuid}/')->name('penilaian.')->group(function () {
                        Route::get('create/', 'create')->name('create');
                        Route::post('create/', 'store')->name('store');
                        Route::delete('delete/', 'destroy')->name('destroy');
                    });
            });

        // Route untuk generate excel
        Route::get('/generate-report/{contest:slug}', [ReportController::class, 'generate_participant_report'])
            ->name('generate-participant-report');
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
