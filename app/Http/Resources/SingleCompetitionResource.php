<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleCompetitionResource extends JsonResource
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
      'judge' => $this->judge->name,
      'slug' => $this->slug,
      'isActive' => $this->is_active,
      'hasFinalScores' => $this->has_final_scores,
      'description' => $this->description,
      'startDate' => $this->start_date->toFormattedDateString(),
      'endDate' => $this->end_date->toFormattedDateString(),
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
      'criterias' => CriteriaResource::collection($this->criterias),
      'levels' => LevelResource::collection($this->levels)
    ];
  }
}
