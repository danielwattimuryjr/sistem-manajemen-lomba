<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CompetitionHasFinalScoresMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $competition = $request->route('competition');

        if ($competition && $competition->has_final_scores) {
          return Inertia::render('errors/custom-error', [
            'code' => 403,
            'message' => 'Perlombaan sudah tidak bisa diubah lagi'
          ])->toResponse($request)->setStatusCode(403);
        }

        return $next($request);
    }
}
