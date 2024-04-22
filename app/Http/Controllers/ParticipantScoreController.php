<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipationScoreRequest;
use App\Models\Contest;
use App\Models\ContestUser;
use App\Models\ParticipantScore;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class ParticipantScoreController extends Controller
{
    public function create(Contest $contest, User $user)
    {
        $contest_data = $contest->only(['slug']);
        $user_data = $user->only(['full_name', 'uuid']);

        return inertia()->render(
            'Private/ParticipantScore/Create',
            compact('contest_data', 'user_data')
        );
    }

    public function store(Contest $contest, User $user, StoreParticipationScoreRequest $request)
    {
        DB::beginTransaction();

        // Log::info('contest : ' . $contest);
        // Log::info('user : ' . $user);
        try {
            $validated = $request->validated();
            $validated['contest_id'] = $contest->id;
            $validated['user_id'] = $user->id;

            ParticipantScore::create($validated);

            DB::commit();

            return to_route('perlombaan.show', $contest->slug)->with('message', [
                "type" => "success",
                "text" => 'Berhasil memberikan nilai.'
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
                "text" => 'Terjadi kesalahan saat memperbaharui data perlombaan.'
            ]);
        }
    }

    public function destroy()
    {
    }
}
