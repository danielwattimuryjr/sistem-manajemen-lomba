<?php

namespace App\Http\Middleware;

use App\Models\Contest;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckContestRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $contest_slug = $request->route('contest');
        $contest = Contest::where('slug', $contest_slug)->firstOrFail();
        $allowed_roles = $contest->roles->pluck("name");

        $user = auth()->user();

        $isAllowed = $user->hasRole($allowed_roles);

        if ($isAllowed) {
            // Role pengguna diizinkan, lanjutkan ke controller
            return $next($request);
        } else {
            // Role pengguna tidak diizinkan, kembalikan respons atau redirect
            return response('Tidak diizinkan untuk mengakses lomba ini', 403);
        }
    }
}
