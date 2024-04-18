<?php

namespace App\Http\Middleware;

use App\Models\Contest;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckContestEndDate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $slug = $request->route('contest');

        $contest = Contest::where('slug', $slug)->firstOrFail();

        $endDate = Carbon::createFromFormat('d F Y', $contest->end_date);

        if($endDate->isPast()) {
            abort(404);
        }
        
        return $next($request);
    }
}
