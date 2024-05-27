<?php

namespace App;

use App\Models\Contest;
use App\Models\User;

trait SAW
{
    public function calculateSAW(Contest $contest)
    {
        $assessmentFactors = $contest->assessmentFactors;
        $participants = $contest->participantScores->groupBy('user_id');

        $normalizedScores = $this->normalizeScores($participants, $assessmentFactors);
        $weightedScores = $this->calculateWeightedScores($normalizedScores, $assessmentFactors);
        $finalScores = $this->calculateFinalScores($weightedScores, $participants, $assessmentFactors);

        // dd($normalizedScores, $weightedScores, $finalScores);
        return $finalScores;
    }

    private function normalizeScores($participants, $assessmentFactors)
    {
        $normalizedScores = [];
        $maxScores = [];

        foreach ($assessmentFactors as $factor) {
            $maxScore = $participants
                ->flatten()
                ->where('contest_assessment_factor_id', $factor->id)
                ->pluck('score')
                ->max();

            $maxScores[$factor->id] = $maxScore ?: 0;
        }

        foreach ($participants as $userId => $userScores) {
            $normalizedRow = [];
            foreach ($assessmentFactors as $factor) {
                $score = $userScores->where('contest_assessment_factor_id', $factor->id)->pluck('score')->first() ?? 0;
                $maxScore = $maxScores[$factor->id];
                $normalizedScore = $maxScore > 0 ? $score / $maxScore : 0;
                $normalizedRow[$factor->id] = [
                    'factor' => $factor->nama_faktor,
                    'score' => $score,
                    'max_score' => $maxScore,
                    'normalized_score' => $normalizedScore
                ];
            }
            $normalizedScores[$userId] = $normalizedRow;
        }

        return $normalizedScores;
    }

    private function calculateWeightedScores($normalizedScores, $assessmentFactors)
    {
        // dd($normalizedScores, $assessmentFactors);
        $weightedScores = [];

        foreach ($normalizedScores as $userId => $normalizedRow) {
            $weightedRow = [];
            foreach ($assessmentFactors as $factor) {
                $weight = $factor->bobot_penilaian / 100; // Mengubah bobot penilaian menjadi desimal
                $normalizedScore = $normalizedRow[$factor->id]['normalized_score'];
                $weightedRow[$factor->id] = [
                    'factor' => $factor->nama_faktor,
                    'weight' => $weight,
                    'weighted_score' => $normalizedScore * $weight
                ];
            }
            $weightedScores[$userId] = $weightedRow;
        }

        return $weightedScores;
    }

    private function calculateFinalScores($weightedScores, $participants, $assessmentFactors)
    {
        $finalScores = [];

        foreach ($weightedScores as $userId => $weightedRow) {
            $user = User::find($userId);
            $finalScore = 0;
            $userScores = $participants[$userId];

            foreach ($weightedRow as $factorScore) {
                $finalScore += $factorScore['weighted_score'];
            }

            $finalScores[$userId] = [
                'user' => $user->full_name,
                'final_score' => $finalScore,
                'details' => []
            ];

            foreach ($assessmentFactors as $factor) {
                $score = $userScores->where('contest_assessment_factor_id', $factor->id)->pluck('score')->first() ?? 0;
                $finalScores[$userId]['details'][] = [
                    'factor' => $factor->nama_faktor,
                    'weight' => $factor->bobot_penilaian / 100,
                    'score' => $score
                ];
            }
        }

        $sortedFinalScores = collect($finalScores)->sortByDesc('final_score')->values()->all();

        return $sortedFinalScores;
    }
}
