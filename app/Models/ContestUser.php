<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ContestUser extends Pivot
{
    public $incrementing = true;

    public $hidden = [
        'id'
    ];

    public function participantScore()
    {
        return $this->hasOne(ParticipantScore::class);
    }
}
