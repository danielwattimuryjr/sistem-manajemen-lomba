<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'username',
    'password',
    'role',
    'phone_number',
    'address',
    'nik',
    'date_of_birth',
    'level_id',
    'account_verified_at',
    'email_verified_at'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
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
      'account_verified_at' => 'datetime',
      'date_of_birth' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function hasRole($roles)
  {
    if (is_array($roles)) {
      return in_array($this->role, $roles);
    }

    return $this->role === $roles;
  }

  public function level(): BelongsTo
  {
    return $this->belongsTo(Level::class);
  }

  public function competitions(): HasMany
  {
    return $this->hasMany(Competition::class);
  }

  public function participants(): BelongsToMany
  {
    return $this->belongsToMany(
      Competition::class,
      Participant::class
    )->withPivot([
      'kd_peserta',
      'id'
    ])->withTimestamps();
  }

  public function canParticipate(Competition $competition): bool
  {
    if (!$this->level_id) {
      return false;
    }

    return $competition->levels()
      ->where('levels.id', $this->level_id)
      ->exists();
  }
}
