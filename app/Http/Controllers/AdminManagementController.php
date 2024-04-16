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
        $query = User::query();
        $query->whereHasRole('ADMIN')->orderByDesc('created_at');

        return Inertia::render('Private/AdminManagement/Index', [
            'users' => UserResource::collection($query->get()),
        ]);
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
        return Inertia::render('Private/AdminManagement/Edit', [
            'user' => new UserResource($user)
        ]);
    }

    public function update(User $user, UpdateAdminManagementRequest $request)
    {
        DB::beginTransaction();

        try {
            $user->update($request->validated());

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
