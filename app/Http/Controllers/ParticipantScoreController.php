<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipationScoreRequest;
use App\Models\Contest;
use App\Models\ParticipantScore;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Log;

class ParticipantScoreController extends Controller
{
    public function create(Contest $contest, User $user)
    {
        $contest_data = $contest->only(['slug']);
        $user_data = $user->only(['full_name', 'uuid']);
        $assessment_factors = $contest->assessmentFactors;

        return inertia()->render(
            'Private/ParticipantScore/Create',
            compact('contest_data', 'user_data', 'assessment_factors')
        );
    }

    public function store(Contest $contest, User $user, StoreParticipationScoreRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            foreach ($validated['form_penilaian'] as $data) {
                $contest->participantScores()->create([
                    'user_id' => $user->id,
                    'contest_id' => $contest->id,
                    'contest_assessment_factor_id' => $data['factor_id'],
                    'score' => $data['score']
                ]);
            }

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
