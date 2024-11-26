<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Competition extends Model
{
  use HasFactory;

  protected function casts(): array
  {
    return [
      'start_date' => 'date',
      'end_date' => 'date',
    ];
  }

  protected $fillable = [
    'name',
    'user_id',
    'slug',
    'description',
    'start_date',
    'end_date',
    'is_active',
    'has_final_scores'
  ];

  public function levels(): BelongsToMany
  {
    return $this->belongsToMany(Level::class, CompetitionLevel::class);
  }

  public function judge(): BelongsTo
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }

  public function criterias(): HasMany
  {
    return $this->hasMany(Criteria::class);
  }

  public function participants(): BelongsToMany
  {
    return $this->belongsToMany(User::class, Participant::class)->withPivot(['kd_peserta', 'id'])->withTimestamps();
  }

  public function finalScores(): HasManyThrough
  {
    return $this->hasManyThrough(
      FinalScore::class,
      Participant::class,
      'competition_id',
      'participant_id'
    );
  }

  public function scoreEntries(): HasManyThrough
  {
    return $this->hasManyThrough(
      ScoreEntry::class,
      Participant::class,
      'competition_id',
      'participant_id'
    );
  }
}
