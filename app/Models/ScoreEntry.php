<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScoreEntry extends Model
{
    use HasFactory;

    protected $fillable = [
      'score',
      'criteria_id',
      'participant_id'
    ];
}
