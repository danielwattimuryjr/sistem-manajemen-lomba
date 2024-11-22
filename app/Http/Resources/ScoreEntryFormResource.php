<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScoreEntryFormResource extends JsonResource
{
  private $participant;

  public function __construct($competition, $participant = null)
  {
    parent::__construct($competition);
    $this->participant = $participant;
  }

  public function toArray(Request $request): array
  {
    return [
      'competition' => [
        'name' => $this->name,
        'slug' => $this->slug
      ],
      'criterias' => CriteriaResource::collection($this->criterias),
      'participant' => [
        'id' => $this->participant->id,
        'name' => $this->participant->name,
        'username' => $this->participant->username,
      ]
    ];
  }
}
