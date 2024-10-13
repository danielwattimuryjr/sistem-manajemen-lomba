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
      'name' => $this->name,
      'email' => $this->email,
      'isAdmin' => Auth::user()->hasRole(['superadmin', 'admin']),
      'isEmailVerified' => Auth::user()->hasVerifiedEmail(),
      'isAccountVerified' => false
    ];
  }
}
