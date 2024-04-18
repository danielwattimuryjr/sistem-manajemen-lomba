<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Notifications\ContestRegistrationNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function getActivePerlombaan()
    {
        $user = auth()->user();
        // Mulai dengan semua kontes yang aktif
        $query = Contest::where('isActive', true);

        // Jika pengguna terautentikasi, cari kontes yang tidak berhubungan dengan pengguna
        if ($user) {
            $query->whereDoesntHave('users', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        }

        // Tambahkan kriteria pencarian jika ada
        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        // Urutkan hasil berdasarkan waktu pembuatan
        $query->orderByDesc('created_at');
        $query->get([
            'title',
            'start_date',
            'end_date',
            'slug',
            'quota'
        ]);

        return Inertia::render('Public/PerlombaanAllPage/Page', [
            'data' =>  $query->get([
                'title',
                'start_date',
                'end_date',
                'slug',
                'quota'
            ]),
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

        $data = $contest->only([
            'title',
            'start_date',
            'end_date',
            'slug',
            'description'
        ]);

        return Inertia::render('Public/PerlombaanDetail', [
            'contest' => $data,
            'available' => $available,
            'hasParticipated' => $hasParticipated
        ]);
    }


    public function assignUserToContest(Contest $contest)
    {
        $user = auth()->user();
        DB::beginTransaction();

        $hasParticipated = $contest->users()->where('user_id', $user->id)->exists();

        if (!$hasParticipated) {
            try {
                $contest->users()->attach(auth()->user()->id);

                DB::commit();

                $user->notify(new ContestRegistrationNotification($contest));

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
