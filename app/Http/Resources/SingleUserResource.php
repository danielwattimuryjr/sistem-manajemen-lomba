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
            'nik' => $this->nik,
            'email' => $this->email,
            'uuid' => $this->uuid,
            'full_name' => $this->full_name,
            'd_o_b' => $this->d_o_b,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'gender' => $this->gender,
            'role_id' => $this->roles->first()->id,
        ];
    }
}
