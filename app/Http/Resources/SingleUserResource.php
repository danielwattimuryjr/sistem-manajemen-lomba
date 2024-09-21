<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleUserResource extends JsonResource
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
      'username' => $this->username,
      'email' => $this->email,
      'role' => $this->role,
      'phoneNumber' => $this->phone_number,
      'address' => $this->address,
      'nik' => $this->nik,
      'dateOfBirth' => $this->date_of_birth,
      'levelId' => $this->level_id,
      'isAccountVerified' => $this->is_account_verified
    ];
  }
}
