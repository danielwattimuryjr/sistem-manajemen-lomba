<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenerateCertificateController;
use Rap2hpoutre\LaravelLogViewer\LogViewerController;

Route::get(
  'logs',
  [LogViewerController::class, 'index']
);

Route::get(
  'generate-certificate/{final_score}',
  GenerateCertificateController::class
)->name('generate-certificate');
