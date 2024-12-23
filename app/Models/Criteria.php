<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Criteria extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'competition_id',
    'weight'
  ];

  public function competition(): BelongsTo
  {
    return $this->belongsTo(Competition::class);
  }
}
