<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, ...$roles): Response
  {
    // Dapatkan user yang sedang login
    $user = Auth::user();

    // Cek apakah user login dan memiliki role yang sesuai
    if ($user && in_array($user->role, $roles)) {
      return $next($request);  // Izinkan akses jika role sesuai
    }

    abort(403, 'You do not have permission to access this page.');

  }
}
