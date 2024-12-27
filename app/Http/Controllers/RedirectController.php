<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
