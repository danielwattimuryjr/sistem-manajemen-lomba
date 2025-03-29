<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
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
        ->where('role', '<>', 'admin')
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
          default: fn($query) => $query->where('role', 'judges')
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
}
