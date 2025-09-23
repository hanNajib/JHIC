<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SchoolData extends Model
{
    use SoftDeletes;

    protected $fillable = ['type', 'name', 'value'];
}
