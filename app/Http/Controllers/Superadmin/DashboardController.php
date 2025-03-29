<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function __invoke()
  {
    $totalParticipants = DB::table('participants')->count();

    $lastMonthParticipants = DB::table('participants')
      ->whereBetween('created_at', [
        now()->subMonth()->startOfMonth(),
        now()->subMonth()->endOfMonth()
      ])->count();

    $currentMonthParticipants = DB::table('participants')
      ->whereBetween('created_at', [
        now()->startOfMonth(),
        now()->endOfMonth()
      ])->count();

    $growth = $lastMonthParticipants > 0
      ? (($currentMonthParticipants - $lastMonthParticipants) / $lastMonthParticipants) * 100
      : 0;

    $newParticipantsThisWeek = DB::table('participants')
      ->whereBetween('created_at', [now()->subDays(7), now()])
      ->count();
    $averageDailyRegistrations = $newParticipantsThisWeek / 7;

    $activeCompetitions = Competition::where('is_active', true)
      ->whereBetween('start_date', [now()->startOfDay(), now()->endOfDay()])
      ->count();
    $totalCompetitions = Competition::count();
    $activePercentage = $totalCompetitions > 0
      ? ($activeCompetitions / $totalCompetitions) * 100
      : 0;

    $completedCompetitions = Competition::where('end_date', '<', now())->count();
    $completedThisMonth = Competition::where('end_date', '<', now())
      ->whereBetween('end_date', [now()->startOfMonth(), now()->endOfMonth()])
      ->count();

    $allMonths = collect([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]);
    $participantData = DB::table('participants')
      ->selectRaw('MONTH(created_at) as month, COUNT(*) as totalParticipants')
      ->whereYear('created_at', now()->year)
      ->groupByRaw('MONTH(created_at)')
      ->pluck('totalParticipants', 'month');
    $participantStatistics = $allMonths->map(function ($month, $index) use ($participantData) {
      $monthNumber = $index + 1; // Bulan dimulai dari 1
      return [
        'month' => $month,
        'totalParticipants' => $participantData->get($monthNumber, 0) // 0 jika tidak ada data
      ];
    });

    return Inertia::render('dashboard/index', [
      'totalParticipants' => $totalParticipants,
      'participantGrowth' => round($growth, 1),
      'newParticipantsThisWeek' => $newParticipantsThisWeek,
      'averageDailyRegistrations' => round($averageDailyRegistrations, 2),
      'activeCompetitions' => $activeCompetitions,
      'activePercentage' => round($activePercentage, 1),
      'completedCompetitions' => $completedCompetitions,
      'completedThisMonth' => $completedThisMonth,
      'participantStatistics' => $participantStatistics
    ]);
  }
}
