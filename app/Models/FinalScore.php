<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinalScore extends Model
{
  use HasFactory;

  protected $fillable = [
    'total_score',
    'rank'
  ];

  public function participant(): BelongsTo
  {
    return $this->belongsTo(
      Participant::class,
      'participant_id',
      'id'
    );
  }
}
