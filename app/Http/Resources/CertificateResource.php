<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'userName' => $this->userName,
          'userNik' => $this->userNik,
          'levelName' => $this->levelName,
          'competitionName' => $this->competitionName,
          'competitionStartDate' => $this->competitionStartDate,
          'competitionEndDate' => $this->competitionEndDate,
        ];
    }
}
