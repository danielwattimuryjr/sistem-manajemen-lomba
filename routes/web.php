<?php

use App\Http\Controllers\RedirectController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Superadmin\DashboardController;

// Welcome Page
Route::get(
  '/',
  WelcomeController::class
)->name('welcome');

// Redirect Dashboard
Route::get(
  '/redirect',
  RedirectController::class
)->name('redirect');

Route::get(
  'admin-panel/',
  DashboardController::class
)->middleware(['auth', 'verified', 'roles:admin,superadmin,judges'])->name('dashboard.home');

// Guest Routes
require __DIR__ . '/guest_route.php';

// Admin Routes
require __DIR__ . '/super_admin_route.php';

// Admin Routes
require __DIR__ . '/admin_route.php';

// Misc Routes
require __DIR__ . '/misc_route.php';

// Auth Routes
require __DIR__ . '/auth.php';
