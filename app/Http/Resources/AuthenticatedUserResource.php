<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserResource extends JsonResource
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
      'levelId' => $this->level_id,
      'name' => $this->name,
      'email' => $this->email,
      'username' => $this->username,
      'phoneNumber' => $this->phone_number,
      'address' => $this->address,
      'nik' => $this->nik,
      'dateOfBirth' => $this->date_of_birth,
      'isAdmin' => Auth::user()->hasRole(['superadmin', 'admin']),
      'role' => $this->role,
      'isEmailVerified' => Auth::user()->hasVerifiedEmail(),
      'isAccountVerified' => !!$this->account_verified_at
    ];
  }
}
