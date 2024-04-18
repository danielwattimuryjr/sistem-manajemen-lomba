<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminManagementRequest;
use App\Http\Requests\UpdateAdminManagementRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminManagementController extends Controller
{
    public function index()
    {
        $data = User::whereHasRole('ADMIN')
            ->orderByDesc('created_at')
            ->get([
                'full_name',
                'email',
                'uuid'
            ]);
        
        return Inertia::render(
            'Private/AdminManagement/Index', 
            compact('data')
        );
    }

    public function create()
    {
        return Inertia::render('Private/AdminManagement/Create');
    }

    public function store(StoreAdminManagementRequest $request)
    {
        DB::beginTransaction();
        try {
            User::create($request->validated())->addRole("ADMIN");

            DB::commit();

            return to_route('admin-management.index')->with(
                'message',
                [
                    'type' => 'success',
                    'text' => 'Berhasil menambahkan Admin baru'
                ]
            );
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            return back()->with('message', [
                'type' => 'error',
                "text" => "Gagal menambahkan data Admin baru."
            ]);
        }
    }

    public function edit(User $user)
    {
        $data = $user->only([
            'full_name',
            'email',
            'uuid'
        ]);

        return Inertia::render(
            'Private/AdminManagement/Edit',
            compact('data')
        );
    }

    public function update(User $user, UpdateAdminManagementRequest $request)
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

            return to_route('admin-management.index')->with('message', [
                "type" => "success",
                "text" => 'Berhasil mengupdate Admin'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            return back()->with('message', [
                "type" => "error",
                "text" => "Gagal mengupdate data ADMIN."
            ]);
        }
    }

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $user->delete();

            DB::commit();

            return to_route('admin-management.index')->with('message', [
                "type" => "success",
                "text" => 'Admin berhasil dihapus!'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                "type" => "error",
                "message" => "Gagal menghapus data Admin"
            ]);
        }
    }
}
