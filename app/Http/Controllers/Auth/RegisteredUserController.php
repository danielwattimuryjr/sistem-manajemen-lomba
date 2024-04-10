<?php

namespace App\Http\Controllers\Auth;

use App\Enum\GenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSignUpFirstStepRequest;
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

    public function validateFirstStep(Request $request) {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $genderValues = array_map(function (GenderEnum $gender) {
            return $gender->value;
        }, GenderEnum::cases());

        $request->validate([
            'full_name'     => 'required',
            'nik'           => [
                'required',
                'numeric',
                Rule::unique('users','nik')
            ],
            'd_o_b'           => 'required|date_format:d F Y',
            'address'       => 'required',
            'phone_number'  => 'required',
            'gender' => 'required|in:' . implode(',', $genderValues),
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'nik' => $request->nik,
            'd_o_b' => $request->d_o_b,
            'address' => $request->alamat,
            'phone_number' => $request->phone_number,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->addRole('GUEST');

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
