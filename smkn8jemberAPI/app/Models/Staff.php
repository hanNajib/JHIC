<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use SoftDeletes, HasImageUrl, HasCursorPagination;

    protected $fillable = [
        'name',
        'role',
        'position',
        'image',
        'subjects',
        'category',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(Staff::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Staff::class, 'parent_id');
    }

    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    protected $casts = [
        'category' => 'string',
    ];
}
