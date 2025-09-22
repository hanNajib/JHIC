<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['type', 'name', 'color'];

    public function articles()
    {
        return $this->morphedByMany(Article::class, 'categorizable');
    }

    public function announcements()
    {
        return $this->morphedByMany(Announcement::class, 'categorizable');
    }

    public function galleries()
    {
        return $this->morphedByMany(Gallery::class, 'categorizable');
    }
}
