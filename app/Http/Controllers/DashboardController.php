<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user && $user->hasRole(["ADMIN", "SUPERADMIN"])) {
            return to_route('admin.dashboard');
        } else {
            return to_route('welcome');
        }
    }
}
