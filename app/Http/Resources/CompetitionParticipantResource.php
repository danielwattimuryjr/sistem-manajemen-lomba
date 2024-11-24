<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompetitionParticipantResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->pivot->id,
      'participantCode' => $this->pivot->kd_peserta,
      'name' => $this->name,
      'email' => $this->email,
      'username' => $this->username,
      'createdAt' => $this->created_at->toFormattedDateString(),
    ];
  }
}
