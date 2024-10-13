<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Judge extends Pivot
{
  use HasFactory;

  public $incrementing = true;

  protected $table = 'judges';

  protected $fillable = [
    'kd_juri'
  ];
}
