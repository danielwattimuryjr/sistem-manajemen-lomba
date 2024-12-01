<?php

namespace App\Http\Controllers;

use App\Http\Resources\CertificateResource;
use App\Models\FinalScore;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class GenerateCertificateController extends Controller
{
    public function __invoke(FinalScore $finalScore)
    {
      $data = new CertificateResource(
        DB::table('final_scores as fs')
          ->join('participants as p', 'fs.participant_id', '=', 'p.id')
          ->join('users as u', 'p.user_id', '=', 'u.id')
          ->join('levels as l', 'u.level_id', '=', 'l.id')
          ->join('competitions as c', 'p.competition_id', '=', 'c.id')
          ->select([
            'u.name as userName',
            'u.nik as userNik',
            'l.name as levelName',
            'c.name as competitionName',
            'c.start_date as competitionStartDate',
            'c.end_date as competitionEndDate',
          ])
          ->where('fs.id', '=', $finalScore->id)
          ->first()
      );

      $path = public_path('images/garuda-image.png'); // Path to your image
      $type = pathinfo($path, PATHINFO_EXTENSION);
      $imageData = file_get_contents($path);
      $base64 = 'data:image/' . $type . ';base64,' . base64_encode($imageData);

      $pdf = Pdf::loadView('certificate', [
        'data' => $data,
        'garudaImage' => $base64
      ]);
      $fileName = 'sertifikat_' . now()->format('Ymd_His') . '.pdf';

      return $pdf->download($fileName);
    }
}
