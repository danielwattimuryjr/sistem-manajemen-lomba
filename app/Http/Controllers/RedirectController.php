<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RedirectController extends Controller
{
  public function __invoke()
  {
    $user = Auth::user();

    if ($user->hasRole(['admin', 'superadmin'])) {
      return to_route('dashboard.home');
    } else {
      return to_route('welcome');
    }
  }
}
