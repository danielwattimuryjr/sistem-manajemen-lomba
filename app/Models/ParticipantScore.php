<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'score',
        'user_id',
        'contest_assessment_factor_id',
        'contest_id'
    ];

    protected $hidden = [
        'user_id',
        'contest_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }

    public function factor()
    {
        return $this->belongsTo(ContestAssessmentFactor::class);
    }
}
