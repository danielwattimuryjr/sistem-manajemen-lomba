<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuestCompetitionResource extends JsonResource
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
          'startDate' => $this->startDate,
          'endDate' => $this->endDate,
          'participants_count' =>$this->particpantsCount
        ];
    }
}
