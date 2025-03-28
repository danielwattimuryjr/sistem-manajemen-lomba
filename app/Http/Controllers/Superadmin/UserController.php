<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\LevelResource;
use App\Http\Resources\UserResource;
use App\Models\Level;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $request->validate([
      'field' => Rule::in(['updated_at', 'created_at', 'name', 'email_verified_at', 'account_verified_at']),
      'direction' => Rule::in(['asc', 'desc']),
      'role' => Rule::in(['admin', 'participants', 'judges']),
      'selected' => 'array',
      'selected.*' => ['integer', Rule::exists('users', 'id')]
    ]);

    $limit = $request->input('limit', 10);

    $users = UserResource::collection(
      User::query()
        ->where('id', '<>', Auth::user()->id)
        ->where('role', '<>', 'superadmin')
        ->when($request->search, function ($query, $value) {
          $query->where(function ($q) use ($value) {
            $q->where('name', 'like', '%' . $value . '%')
              ->orWhere('email', 'like', '%' . $value . '%');
          });
        })
        ->when(
          value: $request->field && $request->direction,
          callback: fn($query) => $query->orderBy($request->field, $request->direction),
          default: fn($query) => $query->latest()
        )
        ->when(
          value: $request->role,
          callback: function ($query, $value) {
            $query->where(function ($q) use ($value) {
              $q->where('role', $value);
            });
          },
          default: fn($query) => $query->where('role', 'admin')
        )
        ->fastPaginate($limit)
        ->withQueryString()
    );

    return Inertia::render('admin/users/user-list/index', [
      'users' => fn() => $users,
      'state' => $request->only('limit', 'page', 'search', 'field', 'direction', 'role'),
      'selected' => $request->input('selected', [])
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $levels = LevelResource::collection(
      Level::query()
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('admin/users/user-form/index', [
      'levels' => fn() => $levels
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreUserRequest $request)
  {
    $validated = $request->validated();
    if ($validated['role'] === 'admin' || $validated['role'] === 'judges') {
      $validated['email_verified_at'] = now();
      $validated['account_verified_at'] = now();
    }
    $user = User::create($validated);

    if ($validated['role'] === 'participants') {
      event(new Registered($user));
    }

    return to_route('dashboard.superadmin.users.index', [
      'role' => $validated['role']
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $user)
  {
    $levels = LevelResource::collection(
      Level::query()
        ->orderBy('name', 'ASC')
        ->get()
    );

    return Inertia::render('admin/users/user-form/index', [
      'initialData' => $user,
      'levels' => fn() => $levels
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateUserRequest $request, User $user)
  {
    $validated = $request->validated();
    $user->update($request->validated());

    return to_route('dashboard.superadmin.users.index', [
      'role' => $validated['role']
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $user)
  {
    $user->delete();

    return to_route('dashboard.superadmin.users.index');
  }

  public function bulkVerifyUser(Request $request)
  {
    $request->validate([
      'user_id' => [
        'required',
        'array',
      ],
      'user_id.*' => [
        'integer',
        Rule::exists('users', 'id')
      ]
    ]);

    foreach ($request->user_id as $id) {
      User::find($id)->update([
        'account_verified_at' => now()
      ]);
    }

    return to_route('dashboard.superadmin.users.index');
  }

  public function getAllUserId(Request $request)
  {
    $userIds = User::where('role', $request->role ?? 'participants')->pluck('id');
    return response()->json($userIds);
  }
}
