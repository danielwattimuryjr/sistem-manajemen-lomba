<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContestResource;
use App\Models\Contest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function getActivePerlombaan()
    {
        $query = Contest::query();
        $query->where('isActive', true);
        $query->orderByDesc('created_at');

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        return Inertia::render('Public/PerlombaanAllPage/Page', [
            'contests' => ContestResource::collection($query->get()),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function getPerlombaanDetail(Contest $contest)
    {
        // Mendapatkan data jumlah peserta yang berpartisipasi
        $participant = $contest->users()->count();
        if (auth()->user()) {
            $hasParticipated = $contest->users()->where('user_id', auth()->user()->id)->exists();
        } else {
            $hasParticipated = false;
        }

        if ($contest->quota == 0) {
            $available = true;
        } else {
            $available = $participant < $contest->quota;
        }

        return Inertia::render('Public/PerlombaanDetail', [
            'contest' => new ContestResource($contest),
            'available' => $available,
            'hasParticipated' => $hasParticipated
        ]);
    }


    public function assignUserToContest(Contest $contest)
    {
        DB::beginTransaction();

        $hasParticipated = $contest->users()->where('user_id', auth()->user()->id)->exists();

        if (!$hasParticipated) {
            try {
                $contest->users()->attach(auth()->user()->id);

                DB::commit();

                return to_route('profile.index')->with([
                    'fragment' => 'contest-section',
                    'message' => [
                        'type' => 'success',
                        'text' => 'Kamu berhasil mendaftarkan diri.'
                    ]
                ]);
            } catch (\Throwable $th) {
                Log::error('Exception caught: ' . $th->getMessage(), [
                    'file' => $th->getFile(),
                    'line' => $th->getLine(),
                    'trace' => $th->getTraceAsString(),
                ]);

                DB::rollBack();

                return back()->with('message', [
                    'type' => 'Error',
                    'text' => 'Gagal mendaftarkan diri'
                ]);
            }
        }

        return back()->with('message', [
            'type' => 'Error',
            'text' => 'Gagal mendaftarkan diri'
        ]);
    }
}
