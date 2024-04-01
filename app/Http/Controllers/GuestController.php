<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContestResource;
use App\Models\Contest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function getActivePerlombaan() {
        $query = Contest::query();
        $query->where('isActive', true);
        $query->orderByDesc('created_at');

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        return Inertia::render('Public/Perlombaan', [
            'contests' => ContestResource::collection($query->get()),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function getPerlombaanDetail(Contest $contest) {
        return Inertia::render('Public/PerlombaanDetail', [
            'contest' => new ContestResource($contest)
        ]);
    }

    public function openFormPendaftaran(Contest $contest) {
        return Inertia::render('Public/FormPendaftaran', [
            'contest' => new ContestResource($contest)
        ]);
    }
}
