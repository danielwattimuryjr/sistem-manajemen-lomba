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


// Guest Routes
require __DIR__ . '/guest_route.php';

// Admin and Superadmin Routes
require __DIR__ . '/admin_route.php';

// Misc Routes
require __DIR__ . '/misc_route.php';

// Auth Routes
require __DIR__ . '/auth.php';

