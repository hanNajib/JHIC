<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChanceCarrier extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $fillable = ['name', 'salary', 'image', 'major_id', 'icon'];
    protected $table = 'chance_carrier';

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
}
