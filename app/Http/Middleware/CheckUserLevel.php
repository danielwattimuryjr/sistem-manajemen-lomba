<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckUserLevel
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
      $competition = $request->route('competition');
      $user = Auth::user();

      $competitionLevelsArray = $competition->levels->pluck('id')->toArray();
      $userLevelId = $user->level_id;

      $isUserEligible = in_array($userLevelId, $competitionLevelsArray);

      if (!$isUserEligible) {
        return Inertia::render('errors/custom-error', [
          'code' => 403,
          'message' => 'Tingkatan peserta yang kamu miliki tidak masuk dalam kriteria perlombaan',
        ])->toResponse($request)->setStatusCode(403);
      }

      $userAlreadyParticipated = $competition->participants()->where('user_id', $user->id)->exists();

      if ($userAlreadyParticipated) {
        return Inertia::render('errors/custom-error', [
          'code' => 401,
          'message' => 'Kamu telah berpartisipasi dalam lomba ini',
        ])->toResponse($request)->setStatusCode(403);
      }

      return $next($request);
    }
}
