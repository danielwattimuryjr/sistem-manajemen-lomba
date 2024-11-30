<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param Closure(Request): (Response) $next
   */
  public function handle(Request $request, Closure $next, ...$roles): Response
  {
    $user = Auth::user();

    if ($user && in_array($user->role, $roles)) {
      return $next($request);
    }

    return Inertia::render('errors/custom-error', [
      'code' => 403,
    ])->toResponse($request)->setStatusCode(403);

  }
}
