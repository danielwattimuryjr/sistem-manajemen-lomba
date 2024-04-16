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
        // dd($this);
        $array = [
            'uuid' => $this->uuid,
            'full_name' => $this->full_name,
            'd_o_b' => $this->d_o_b,
            'address' => $this->address,
            'nik' => $this->nik,
            'gender' => $this->gender,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
        ];

        if ($this->contests) {
            $array['contests'] = [
                'count' => $this->contests->count(),
                'data' => $this->contests
            ];
        }

        return $array;
    }
}
