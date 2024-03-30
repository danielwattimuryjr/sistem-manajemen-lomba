<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function getActivePerlombaan() {
        $contests = Contest::where('isActive', true)->orderBy('created_at', 'desc')
            ->get(['title', 'start_date', 'end_date', 'slug']);

        return Inertia::render('Public/PerlombaanAll', [
            'contests' => $contests
        ]);
    }
}
