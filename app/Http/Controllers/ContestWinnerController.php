<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use Illuminate\Http\Request;

class ContestWinnerController extends Controller
{
    public function index(Contest $contest)
    {
        // return message kalau peserta 0
        if (!$contest->users()->count() > 0) {
            return back()->with('message', [
                'type' => 'error',
                'text' => 'Jumlah peserta masih 0. Tidak bisa menentukan pemenang.'
            ]);
        }

        // return message kalau status masih aktif
        if ($contest->isActive) {
            return back()->with('message', [
                'type' => 'error',
                'text' => 'Perlombaan masih aktif. Tidak bisa menentukan pemenang'
            ]);
        }
    }
}
