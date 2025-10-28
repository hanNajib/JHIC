<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SchoolData extends Model
{
    use SoftDeletes;

    protected $fillable = ['type', 'name', 'value'];

     public static function whereName($name): Builder
    {
        return self::where('name', $name);
    }
}
