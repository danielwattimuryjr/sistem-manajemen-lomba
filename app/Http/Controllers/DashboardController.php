<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $user = auth()->user();

        if ($user->hasRole("ADMIN")){
            return to_route('perlombaan.index');
        } else {
            return to_route('landing.page');
        }
    }
}
