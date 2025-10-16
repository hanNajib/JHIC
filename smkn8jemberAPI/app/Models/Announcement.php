<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $fillable = ['title', 'image', 'content', 'category_id', 'created_at'];
    protected $with = ['category'];
    protected $appends = ['date'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function getDateAttribute()
    {
        return $this->created_at ? $this->created_at->format('d F Y') : null;
    }
}
