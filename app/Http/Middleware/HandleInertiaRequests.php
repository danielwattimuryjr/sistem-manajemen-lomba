<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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
        $user = auth()->user();

        if ($user) {
            $role = $user->roles->first()->name;

            $user = [
                'full_name' => $user->full_name,
                'email' => $user->email,
                'nik' => $user->nik,
                'd_o_b' => $user->d_o_b,
                'address' => $user->address,
                'phone_number' => $user->phone_number,
                'gender' => $user->gender,
                'role' => $role,
            ];
        }


        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ?? null,
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
            ],
            'fragment' => fn() => $request->session()->get('fragment')
        ];
    }
}
