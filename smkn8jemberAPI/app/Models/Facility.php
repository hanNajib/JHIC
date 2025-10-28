<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facility extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    public $table = "facility";
    protected $fillable = ['name', 'description', 'image', 'room_total'];
}
