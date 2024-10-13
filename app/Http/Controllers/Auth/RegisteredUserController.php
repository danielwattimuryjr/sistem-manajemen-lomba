<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\LevelResource;
use App\Models\Level;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
    $levels = LevelResource::collection(
      Level::query()
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('auth/sign-up', [
      'levels' => fn() => $levels
    ]);
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterRequest $request): RedirectResponse
  {
    $validated = $request->validated();
    $validated['role'] = 'guest';
    $validated['password'] = Hash::make($request->password);

    $user = User::create($validated);

    event(new Registered($user));

    Auth::login($user);

    return redirect(route('redirect', absolute: false));
  }
}
