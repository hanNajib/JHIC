<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = ['title', 'image', 'content', 'category_id'];
    protected $with = ['category'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
