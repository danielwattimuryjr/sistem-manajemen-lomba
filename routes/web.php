<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

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

Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

// Guest Routes
require __DIR__ . '/guest_route.php';

// Admin and Superadmin Routes
require __DIR__ . '/admin_route.php';

// Auth Routes
require __DIR__ . '/auth.php';
