<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use SoftDeletes, HasCursorPagination;

    protected $fillable = ['name', 'description', 'major_id'];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
}
