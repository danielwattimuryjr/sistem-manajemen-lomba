<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {
    $ziggy = new Ziggy($group = null, $request->url());

    return [
      ...parent::share($request),
      'auth' => [
        'user' => $request->user() ? AuthenticatedUserResource::make($request->user()) : null,
      ],
      'ziggy' => $ziggy->toArray(),
    ];
  }
}
