<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory, Uuid;

    protected $fillable = [
        'user_id',
        'ktp',
        'nik',
        'first_name',
        'last_name',
        'dob',
        'address',
        'phone_number',
       'sex',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
