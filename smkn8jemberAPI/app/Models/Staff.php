<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = [
        'name', 'role', 'position', 'image', 'subjects'
    ];
}
