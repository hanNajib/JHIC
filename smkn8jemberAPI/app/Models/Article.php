<?php

namespace App\Models;

use App\Traits\AutoCacheable;
use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Article extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $fillable = [
        'title',
        'slug',
        'image',
        'content',
        'status',
        'views',
        'author_id'
    ];
    protected $with = ['author'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }

    public function getExcerptAttribute()
    {
        return Str::limit(strip_tags($this->content), 150);
    }

    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    public function incrementViews(): void
    {
        $this->increment('views');
    }

    public function scopePublished($query)
    {
        if(!Auth::user()) {
            return $query->where('status', 'published');
        }
        return $query;
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public static function whereSlug($slug)
    {
        return self::where('slug', $slug);
    }

    public function setSlugAttribute($value)
    {
        $slug = Str::slug($value);
        $count = 1;
        
        while (static::where('slug', $slug)->where('id', '!=', $this->id ?? 0)->exists()) {
            $slug = Str::slug($value) . '-' . $count;
            $count++;
        }
        
        $this->attributes['slug'] = $slug;
    }

    
}
