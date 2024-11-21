<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionParticipantResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\SingleCompetitionResource;
use App\Http\Resources\UserResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CompetitionController extends Controller
{
  public function index(Request $request)
  {
    $user = Auth::user();

    $competitions = CompetitionResource::collection(
      Competition::query()
        ->withCount('participants')
        ->where('is_active', true)
        ->when(
          value: $request->search,
          callback: fn($query, $value) => $query->where('name', 'like', '%' . $value . '%')
        )
        ->get()
    );

    return Inertia::render('competitions/index', [
      'competitions' => fn() => $competitions,
      'state' => $request->only('search'),
    ]);
  }

  public function show(Competition $competition, Request $request)
  {
    $competition->load([
      'criterias',
      'judge',
      'levels'
    ]);

    $competition = new SingleCompetitionResource($competition);

    $participants = CompetitionParticipantResource::collection(
      $competition->participants()
        ->when($request->search, function ($q, $value) {
          $q->where('name', 'like', '%' . $value . '%')
            ->orWhere('email', 'like', '%' . $value . '%');
        })
        ->orderBy('created_at', 'DESC')
        ->get()
    );

    return Inertia::render('competitions/show', [
      'competition' => $competition,
      'participants' => $participants,
      'state' => $request->only('search'),
    ]);
  }

  public function postParticipantData(Competition $competition)
  {
    $user = Auth::user();

    $participantCode = $competition->generateParticipantCode();

    $competition->participants()->attach($user->id, [
      'kd_peserta' => $participantCode
    ]);

    return to_route('guest.competitions.index');
  }
}
