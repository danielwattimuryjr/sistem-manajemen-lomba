<?php

namespace App\Http\Controllers;

use App\Exports\ParticipantExport;
use App\Models\Contest;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * ? Function untuk generate report user yang 
     * ? berpartisipasi dalam satu perlombaan
     */
    public function generate_participant_report(Contest $contest)
    {
        $today = Carbon::now();
        $fileName = "Peserta Lomba_" . $contest->title . "_" . $today->timestamp . ".xlsx";

        return Excel::download(new ParticipantExport($contest->slug), $fileName);
    }
}
