<?php

namespace App\Http\Controllers;

use App\Enum\GenderEnum;
use App\Http\Requests\StoreGuestManagementRequest;
use App\Http\Requests\UpdateGuestManagementRequest;
use App\Http\Resources\ContestResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
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
        $users = User::whereHasRole("GUEST")->orderByDesc('created_at');

        return inertia()->render('Private/GuestManagement/Index', [
            'guests' => UserResource::collection($users->get())
        ]);
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

        return inertia()->render('Private/GuestManagement/Create', [
            'availableGenders' => $genders,
        ]);
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

            User::create($validated)->addRole('GUEST');

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

        return inertia()->render('Private/GuestManagement/Show/Page', [
            'user' => $user->only(['uuid', 'full_name', 'd_o_b', 'phone_number', 'address', 'gender', 'contests']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        return inertia()->render('Private/GuestManagement/Edit', [
            'user' => new UserResource($user),
            'availableGenders' => $genders,
        ]);
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
