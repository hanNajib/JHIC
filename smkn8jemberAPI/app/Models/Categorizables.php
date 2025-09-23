<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorizable extends Model
{
    protected $fillable = ['category_id', 'categorizable_id', 'categorizable_type'];
}
