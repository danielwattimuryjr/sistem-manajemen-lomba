<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CertificateTemplate extends Model
{
  protected $fillable = [
    'competition_id',
    'file_path'
  ];

  use HasFactory;

  public function competition(): BelongsTo
  {
    return $this->belongsTo(Competition::class);
  }
}
