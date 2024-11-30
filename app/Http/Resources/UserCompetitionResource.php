<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCompetitionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'participantCode' => $this->participant_code,
          'competitionName' => $this->competition_name,
          'competitionSlug' => $this->competition_slug,
          'finalScore' => $this->final_score,
          'hasFinalScores' => $this->has_final_scores,
          'rank' => $this->rank,
          'joinedAt' => Carbon::parse($this->joined_at)->toDateString(),
          'startDate' => Carbon::parse($this->competition_start_at)->toDateString(),
          'endDate' => Carbon::parse($this->competition_end_at)->toDateString(),
        ];
    }
}
