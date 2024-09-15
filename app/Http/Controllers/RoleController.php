<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $request->validate([
      'field' => Rule::in(['updated_at', 'created_at', 'name', 'display_name', 'users_count']),
      'direction' => Rule::in(['asc', 'desc'])
    ]);

    $limit = $request->input('limit', 10);

    $roles = RoleResource::collection(
      Role::query()
        ->select('roles.*')
        ->where('name', '<>', 'admin')
        ->where('name', '<>', 'superadmin')
        ->withCount('users')
        ->when($request->search, function ($query, $value) {
          $query->where(function ($q) use ($value) {
            $q->where('name', 'like', '%' . $value . '%')
              ->orWhere('display_name', 'like', '%' . $value . '%');
          });
        })
        ->when($request->field && $request->direction, function ($query) use ($request) {
          if ($request->field === 'users_count') {
            $query->orderBy('users_count', $request->direction);
          } else {
            $query->orderBy($request->field, $request->direction);
          }
        }, function ($query) {
          $query->latest();
        })
        ->fastPaginate($limit)
        ->withQueryString()
    );

    return Inertia::render('admin/roles/index', [
      'roles' => fn() => $roles,
      'state' => $request->only('limit', 'page', 'search', 'field', 'direction')
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('admin/roles/form');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreRoleRequest $request)
  {
    Role::create($request->validated());

    return to_route('dashboard.roles.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Role $role)
  {
    return Inertia::render('admin/roles/form', [
      'initialData' => $role
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateRoleRequest $request, Role $role)
  {
    $role->update($request->validated());

    return to_route('dashboard.roles.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Role $role)
  {
    $role->delete();

    return to_route('dashboard.roles.index');
  }
}
