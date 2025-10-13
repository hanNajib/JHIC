<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Extracurricular extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $table = 'extracurricular';
    protected $fillable = ['name', 'mentor_name', 'description', 'image'];
}
