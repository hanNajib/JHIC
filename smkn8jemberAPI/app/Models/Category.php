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
    if (!$value) {
        $this->attributes['color'] = null;
        return;
    }

    $value = trim($value);
    if (strpos($value, '#') !== 0) {
        $value = '#' . $value;
    }

    $value = strtolower($value);

    // Cek validitas
    if (!preg_match('/^#([0-9a-f]{3}|[0-9a-f]{6})$/i', $value)) {
        throw new \InvalidArgumentException("Invalid hex color value: {$value}");
    }

    // Convert format pendek ke panjang
    if (strlen($value) === 4) {
        $value = '#' . $value[1] . $value[1]
            . $value[2] . $value[2]
            . $value[3] . $value[3];
    }

    $this->attributes['color'] = $value;
}
}
