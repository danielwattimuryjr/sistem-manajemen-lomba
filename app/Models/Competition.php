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
    return $this->belongsToMany(User::class, Participant::class)->withPivot(['kd_peserta'])->withTimestamps();
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

  public function generateParticipantCode()
  {
    $words = explode(' ', $this->name);
    $acronym = '';

    foreach ($words as $word) {
      $acronym .= strtoupper(substr($word, 0, 1));
    }

    $currentCount = $this->participants()->count() + 1;

    $numberPart = str_pad($currentCount, 3, '0', STR_PAD_LEFT);

    return $acronym . '-' . $numberPart;
  }
}
