<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
    use HasFactory;

    protected function casts(): array
{
    return [
        'start_date' => 'datetime:d F Y',
        'end_date' => 'datetime:d F Y',
    ];
}

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
    ];
}
