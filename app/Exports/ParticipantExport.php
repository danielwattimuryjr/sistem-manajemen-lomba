<?php

namespace App\Exports;

use App\Models\Contest;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Style;

class ParticipantExport implements
    FromCollection,
    ShouldAutoSize,
    WithStyles,
    WithHeadings,
    WithColumnFormatting,
    WithDefaultStyles
{
    private $slug;

    public function __construct(string $slug)
    {
        $this->slug = $slug;
    }


    public function collection()
    {
        $contest = Contest::where('slug', $this->slug)->firstOrFail();

        $participants = $contest->users->map(function ($user) {
            $formattedCreatedAt = Carbon::parse($user->pivot->created_at)->format('d F Y');

            return [
                'nik' => (string) $user->nik,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'phone_number' => (string) $user->phone_number,
                'address' => $user->address,
                'created_at' => $formattedCreatedAt
            ];
        });

        return $participants;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => [
                    'bold' => true
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['argb' => Color::COLOR_YELLOW],
                ],
            ],
        ];
    }

    public function defaultStyles(Style $defaultStyle)
    {
        return [
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_NUMBER, // Format kolom NIK sebagai teks
            'D' => NumberFormat::FORMAT_NUMBER, // Format kolom nomor telepon sebagai teks
        ];
    }

    public function headings(): array
    {
        return [
            "NIK",
            "Nama Lengkap",
            'Email',
            'No. Telp',
            'Alamat',
            'Tgl. Daftar'
        ];
    }
}
