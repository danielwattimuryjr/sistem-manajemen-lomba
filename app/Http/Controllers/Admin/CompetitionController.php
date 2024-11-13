<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetitionController extends Controller
{
  public function index()
  {
    $competitions = Competition::get();

    return Inertia::render('admin/competitions/index', [
      'competitions' => $competitions
    ]);
  }
}
