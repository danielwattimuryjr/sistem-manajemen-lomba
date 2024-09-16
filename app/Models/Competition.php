<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    'description',
    'start_date',
    'end_date',
    'isActive',
  ];
}
