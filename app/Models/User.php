<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enum\GenderEnum;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;

class User extends Authenticatable implements LaratrustUser
{
    use HasFactory, Notifiable, HasRolesAndPermissions, Uuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'nik',
        'full_name',
        'd_o_b',
        'address',
        'phone_number',
        'gender'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'nik',
        'id'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'gender' => GenderEnum::class
        ];
    }

    /**
     * ? Relasi untuk mendapatkan data perlombaan
     * ? apa saja yang diikuti oleh user
     */
    public function contests()
    {
        return $this->belongsToMany(Contest::class)->withTimestamps();
    }

    public function participantScores()
    {
        return $this->hasMany(ParticipantScore::class);
    }
}
