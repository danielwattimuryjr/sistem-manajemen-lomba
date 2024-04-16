<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd($this);
        $contest = [
            'title' => $this->title,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'isActive' => $this->isActive,
            'quota' => $this->quota,
            'slug' => $this->slug,
        ];

        if ($this->users) {
            $contest['participants'] = [
                "current" => $this->users->count(),
                "users" => ParticipantResource::collection($this->users)
            ];
        }
        return $contest;
    }
}
