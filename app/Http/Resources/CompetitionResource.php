<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompetitionResource extends JsonResource
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
      'participantsCount' => $this->participants_count,
      'isActive' => $this->is_active,
      'hasFinalScores' => $this->has_final_scores,
      'startDate' => $this->start_date->toDateString(),
      'endDate' => $this->end_date->toDateString(),
      'createdAt' => $this->created_at->diffForHumans(),
      'updatedAt' => $this->updated_at->diffForHumans(),
    ];
  }
}
