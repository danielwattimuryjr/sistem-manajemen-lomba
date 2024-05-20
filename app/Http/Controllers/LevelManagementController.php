<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLevelManagementRequest;
use App\Http\Requests\UpdateLevelManagementRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class LevelManagementController extends Controller
{
    public function index()
    {
        $roles = Role::whereNot('name', 'SUPERADMIN')
            ->whereNot('name', 'ADMIN')
            ->get([
                'id',
                'name',
                'display_name'
            ]);

        return inertia()->render('Private/LevelManagement/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        return inertia()->render('Private/LevelManagement/Create');
    }

    public function store(StoreLevelManagementRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            Role::firstOrCreate([
                'name' => $validated['name'],
                'display_name' => $validated['display_name'],
                'description' => $validated['name']
            ]);

            DB::commit();

            return to_route('tingkat-peserta.index')->with('message', [
                "type" => 'success',
                'text' => 'Data tingkatan peserta baru berhasil dibuat'
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
                "text" => 'Terjadi kesalahan saat membuat data tingkatan peserta baru.'
            ]);
        }
    }

    public function edit(Role $role)
    {
        return inertia()->render('Private/LevelManagement/Edit', [
            'role' => $role
        ]);
    }

    public function update(Role $role, UpdateLevelManagementRequest $request)
    {
        DB::beginTransaction();

        try {
            $role->update(
                $request->validated()
            );

            DB::commit();

            return to_route('tingkat-peserta.index')->with('message', [
                "type" => 'success',
                'text' => 'Data tingkatan peserta baru berhasil diperbaharui.'
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
                "text" => 'Terjadi kesalahan saat memperbaharui data tingkatan peserta.'
            ]);
        }
    }

    public function destroy(Role $role)
    {
        DB::beginTransaction();

        try {
            $role->delete();

            DB::commit();

            return to_route('tingkat-peserta.index')->with('message', [
                "type" => 'success',
                'text' => 'Data tingkatan peserta baru berhasil dihapus.'
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
                "text" => 'Terjadi kesalahan saat menghapus data tingkatan peserta.'
            ]);
        }
    }
}
