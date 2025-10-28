<?php

namespace App\Models;

use App\Traits\HasCursorPagination;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes, HasCursorPagination;

    protected $fillable = ['type', 'name', 'color'];
    // protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

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

    public function setColorAttribute($value)
    {
        if (empty($value)) {
            $this->attributes['color'] = null;
            return;
        }

        $value = trim((string)$value);
        
        if (empty($value)) {
            $this->attributes['color'] = null;
            return;
        }

        if (!str_starts_with($value, '#')) {
            $value = '#' . $value;
        }

        $value = strtolower($value);

        if (!$this->isValidHexColor($value)) {
            throw new \InvalidArgumentException("Invalid hex color format: {$value}. Expected format: #RGB or #RRGGBB");
        }

        if (strlen($value) === 4) {
            $value = '#' . 
                str_repeat($value[1], 2) . 
                str_repeat($value[2], 2) . 
                str_repeat($value[3], 2);
        }

        $this->attributes['color'] = $value;
    }

    /**
     * Validasi hex color yang aman tanpa regex bermasalah
     */
    private function isValidHexColor($value)
    {
        if (!in_array(strlen($value), [4, 7])) {
            return false;
        }

        if (!str_starts_with($value, '#')) {
            return false;
        }

        $hex = substr($value, 1);
        return ctype_xdigit($hex);
    }
}
