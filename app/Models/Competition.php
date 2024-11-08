<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

  public function criterias(): HasMany
  {
    return $this->hasMany(Criteria::class);
  }

  public function judges(): BelongsToMany
  {
    return $this->belongsToMany(User::class, Judge::class);
  }

  public function participants(): BelongsToMany
  {
    return $this->belongsToMany(User::class, Participant::class)->withPivot(['kd_peserta'])->withTimestamps();
  }

  public function certificate_template(): HasOne
  {
    return $this->hasOne(CertificateTemplate::class);
  }

  public function final_scores(): HasManyThrough
  {
    return $this->hasManyThrough(FinalScore::class, Participant::class);
  }

  public function judgements(): HasManyThrough
  {
    return $this->hasManyThrough(Judgement::class, Participant::class);
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
