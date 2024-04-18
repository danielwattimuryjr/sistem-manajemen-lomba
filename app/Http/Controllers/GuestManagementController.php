<?php

namespace App\Http\Controllers;

use App\Enum\GenderEnum;
use App\Http\Requests\StoreGuestManagementRequest;
use App\Http\Requests\UpdateGuestManagementRequest;
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
        $data = User::whereHasRole('GUEST')
            ->orderByDesc('created_at')
            ->get([
                'full_name',
                'email',
                'uuid'
            ]);
        $users = User::whereHasRole("GUEST")->orderByDesc('created_at');

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

        return inertia()->render(
            'Private/GuestManagement/Create',
            compact('genders')
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
            return array_merge($contest->only([
                'title',
                'start_date',
                'end_date'
            ]), $pivot);
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
        $data = $user->only([
            'nik',
            'email',
            'uuid', 
            'full_name', 
            'd_o_b', 
            'phone_number', 
            'address', 
            'gender', 
            'contests'
        ]);

        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        return inertia()->render(
            'Private/GuestManagement/Edit',
            compact('data', 'genders')
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
