<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'ktp_img_path' => $this->ktp,
            'nik' => $this->nik,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'd_o_b' => $this->d_o_b,
            'address' => $this->address,
            'phone_number' => $this->phone_number,
           'sex' => $this->sex,
        ];
    }
}
