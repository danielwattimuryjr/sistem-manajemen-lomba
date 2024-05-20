<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestAssessmentFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'contest_id',
        'nama_faktor',
        'bobot_penilaian'
    ];

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }
}
