<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $fillable = ['title', 'description', 'image'];
    protected $table = 'gallery';
    protected $appends = ['date'];
    protected $with = ['categories'];

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }

    public function getDateAttribute()
    {
        return $this->created_at ? $this->created_at->format('d F Y') : null;
    }
}
