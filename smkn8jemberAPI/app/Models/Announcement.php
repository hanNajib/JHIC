<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = ['title', 'image', 'content'];

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }
}
