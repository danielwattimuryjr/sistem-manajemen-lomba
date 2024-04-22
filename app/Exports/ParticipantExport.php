<?php

namespace App\Exports;

use App\Models\Contest;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ParticipantExport implements
    FromView,
    WithColumnFormatting
{
    private $slug;

    public function __construct(string $slug)
    {
        $this->slug = $slug;
    }

    public function view(): View
    {
        $contest = Contest::where('slug', $this->slug)->firstOrFail();

        $participants = $contest->users->map(function ($user) use ($contest) {
            $formattedCreatedAt = Carbon::parse($user->pivot->created_at)->format('d F Y');
            $score = $user->participantScores->where('contest_id', $contest->id)->first();
            $scoreData = $score ? $score->score : null;

            $array = [
                'nik' => (string) $user->nik,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'phone_number' => (string) $user->phone_number,
                'address' => $user->address,
                'created_at' => $formattedCreatedAt,
                'score' => $scoreData
            ];

            return $array;
        });

        return view('exports.participants', compact('participants'));
    }

    public function columnFormats(): array
    {
        return [
            'B' => NumberFormat::FORMAT_NUMBER, // Format kolom NIK sebagai teks
            'E' => NumberFormat::FORMAT_NUMBER, // Format kolom nomor telepon sebagai teks
        ];
    }
}
