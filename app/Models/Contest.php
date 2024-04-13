<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'isActive',
        'quota',
        'slug',
        'created_by'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    // Relasi untuk mendapatkan data partisipan
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
