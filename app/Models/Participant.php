<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Participant extends Pivot
{
  use HasFactory;

  public $incrementing = true;

  protected $table = 'participants';

  protected $fillable = [
    'kd_peserta'
  ];

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}
