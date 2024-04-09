<?php

namespace App\Http\Controllers;

use App\Enum\GenderEnum;
use App\Http\Requests\UpdateUserProfileRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function index () {
        $genders = [
            'male' => GenderEnum::MALE,
            'female' => GenderEnum::FEMALE,
        ];

        return inertia()->render('Private/ProfilePage', [
            'availableGenders' => $genders,
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function saveData(UpdateUserProfileRequest $request) {
        $user = auth()->user();
        DB::beginTransaction();
        try{
            $user->update($request->validated());

            DB::commit();

            return to_route('profile.index')->with('success', "Berhasil mengubah profile.");
        } catch(\Throwable $th) {
            DB::rollBack();
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            return back()->with('error', "Gagal mengupdate data profil.");
        }
    }
}
