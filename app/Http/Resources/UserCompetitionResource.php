<?php

namespace App\Http\Resources;

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
          'name' => $this->name,
          'slug' => $this->slug,
          'isActive' => $this->isActive,
          'hasFinalScores' => $this->has_final_scores,
          'finalScore' => 80,
          'rank' => 1,
          'participantCode' => 'T-0001',
          'joinedAt' => 'smth',
          'startDate' => $this->start_date->toDateString(),
          'endDate' => $this->end_date->toDateString(),
        ];
    }
}
