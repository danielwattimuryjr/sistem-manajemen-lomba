<?php

namespace App\Http\Controllers;

use App\Enum\GenderEnum;
use App\Http\Requests\StoreGuestManagementRequest;
use App\Http\Requests\UpdateGuestManagementRequest;
use App\Http\Resources\SingleUserResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Log;

class GuestManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::whereNotIn('name', ['SUPERADMIN', 'ADMIN'])
            ->pluck('name')
            ->toArray();

        $data = UserResource::collection(User::whereHasRole($roles)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($user) {
                $roleName = $user->roles->first()->display_name;
                $user->role_name = $roleName;
                return $user;
            }));


        return inertia()->render(
            'Private/GuestManagement/Index',
            compact('data')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        $availableUserLevels = Role::whereNotIn('name', ['SUPERADMIN', 'ADMIN'])
            ->get(['id', 'display_name']);

        return inertia()->render(
            'Private/GuestManagement/Create',
            [
                'genders' => $genders,
                'availableRoles' => $availableUserLevels
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuestManagementRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $validated['password'] = Hash::make($validated['password']);

            User::create($validated)->addRole($validated['role_id']);

            DB::commit();

            return to_route('guest-management.index')->with('message', [
                'type' => 'success',
                'text' => 'Guest berhasil ditambahkan.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'error',
                'text' => "Terjadi kesalahan saat menambahkan guest."
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('contests');

        $data = $user->only([
            'nik',
            'uuid',
            'full_name',
            'd_o_b',
            'phone_number',
            'address',
            'gender',
            'contests'
        ]);

        $contests = $user->contests->map(function ($contest) use ($user) {
            $pivot = $contest->pivot->only('created_at');
            $score = $user->participantScores->where('contest_id', $contest->id)->first();
            $scoreData = $score ? $score->only('score') : ['score' => null];

            return array_merge($contest->only([
                'title',
                'start_date',
                'end_date'
            ]), $pivot, $scoreData);
        });

        return inertia()->render(
            'Private/GuestManagement/Show',
            compact('data', 'contests')
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $data = new SingleUserResource($user);

        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        $availableUserLevels = Role::whereNotIn('name', ['SUPERADMIN', 'ADMIN'])
            ->get(['id', 'display_name']);

        return inertia()->render(
            'Private/GuestManagement/Edit',
            compact('data', 'genders', 'availableUserLevels')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, UpdateGuestManagementRequest $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validated();

            // Remove password field if it's null
            if (!$request->filled('password')) {
                unset($validatedData['password']);
            }

            $user->update($validatedData);
            $user->removeRole($user->roles->first()->id);
            $user->addRole($validatedData['role_id']);

            DB::commit();

            return to_route('guest-management.index')->with('message', [
                'type' => 'success',
                'text' => 'Guest berhasil diperbaharui.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'error',
                'text' => "Terjadi kesalahan saat memperbaharui guest."
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        DB::beginTransaction();

        try {
            $user->contests()->detach();

            $user->delete();

            DB::commit();

            return to_route('guest-management.index')->with('message', [
                'type' => 'success',
                'text' => 'Guest berhasil dihapus.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'error',
                'text' => "Terjadi kesalahan saat menghapus guest."
            ]);
        }
    }
}
