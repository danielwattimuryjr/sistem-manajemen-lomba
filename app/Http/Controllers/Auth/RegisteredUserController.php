<?php

namespace App\Http\Controllers\Auth;

use App\Enum\GenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSignUpFirstStepRequest;
use App\Http\Requests\StoreSignUpSecondStepRequest;
use App\Models\Role;
use App\Models\User;
use App\Notifications\RegisterNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        $availableUserLevels = Role::whereNotIn('name', ['SUPERADMIN', 'ADMIN'])
            ->get(['id', 'display_name']);

        return Inertia::render('Auth/SignUp', [
            'availableGenders' => $genders,
            'availableUserLevels' => $availableUserLevels
        ]);
    }

    public function validateFirstStep(StoreSignUpFirstStepRequest $request)
    {
        $request->validated();
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreSignUpSecondStepRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::create($validated)->addRole($validated['role_id']);

        event(new Registered($user));

        Auth::login($user);

        $user->notify(new RegisterNotification());

        return redirect(route('dashboard', absolute: false));
    }
}
