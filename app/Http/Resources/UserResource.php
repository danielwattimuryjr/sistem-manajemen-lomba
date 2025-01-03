<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'username' => $this->username,
      'accountVerified' => $this->account_verified_at,
      'emailVerified' => $this->email_verified_at,
      'createdAt' => $this->created_at->diffForHumans(),
      'updatedAt' => $this->updated_at->diffForHumans(),
    ];
  }
}
