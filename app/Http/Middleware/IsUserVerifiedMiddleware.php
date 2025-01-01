<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class IsUserVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
      $user = Auth::user();

      if (!$user->hasVerifiedEmail() || !$user->account_verified_at) {
        return Inertia::render('errors/custom-error', [
          'code' => 401,
          'message' => 'Akun belum terverifikasi',
        ])->toResponse($request)->setStatusCode(403);
      }

      return $next($request);
    }
}
