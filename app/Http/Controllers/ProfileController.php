<?php

namespace App\Http\Controllers;

use App\Enum\GenderEnum;
use App\Http\Requests\UpdateUserProfileRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $genders = [
            GenderEnum::MALE,
            GenderEnum::FEMALE,
        ];

        $contests = $user->contests;

        return inertia()->render('Private/ProfilePage/Page', [
            'availableGenders' => $genders,
            'queryParams' => request()->query() ?: null,
            'contests' => $contests,
        ]);
    }

    public function saveData(UpdateUserProfileRequest $request)
    {
        $user = auth()->user();
        DB::beginTransaction();
        try {
            $user->update($request->validated());

            DB::commit();

            return to_route('profile.index')->with('message', [
                'type' => 'success',
                'text' => 'Berhasil memperbaharui profil kamu.'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            return back()->with("message", [
                'type' => 'error',
                'text' => 'Terjadi kesalahan saat memperbaharui profil kamu.'
            ]);
        }
    }
}
