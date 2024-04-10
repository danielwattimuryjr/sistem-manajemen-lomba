<?php

namespace App\Http\Controllers\Auth;

use App\Enum\GenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSignUpFirstStepRequest;
use App\Http\Requests\StoreSignUpSecondStepRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
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
            'male' => GenderEnum::MALE,
            'female' => GenderEnum::FEMALE,
        ];

        return Inertia::render('Auth/SignUp', [
            'availableGenders' => $genders,
        ]);
    }

    public function validateFirstStep(StoreSignUpFirstStepRequest $request) {
        $request->validated();
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreSignUpSecondStepRequest $request): RedirectResponse
    {
        $user = User::create($request->validated())->addRole('GUEST');

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
