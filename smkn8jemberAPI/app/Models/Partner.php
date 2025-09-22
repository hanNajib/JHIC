<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = ['name', 'image', 'major_id'];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
}
