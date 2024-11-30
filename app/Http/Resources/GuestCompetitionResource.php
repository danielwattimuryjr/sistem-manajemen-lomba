<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
          'startDate' => Carbon::parse($this->start_date)->toDateString(),
          'endDate' => Carbon::parse($this->end_date)->toDateString(),
          'participantsCount' =>$this->participants_count
        ];
    }
}
