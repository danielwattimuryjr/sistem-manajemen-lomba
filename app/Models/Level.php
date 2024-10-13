<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Level extends Model
{
  protected $fillable = [
    'name',
    'slug'
  ];

  public $guarded = [];

  public function users(): HasMany
  {
    return $this->hasMany(User::class);
  }

  public function competitions(): BelongsToMany
  {
    return $this->belongsToMany(Competition::class, CompetitionLevel::class);
  }
}
