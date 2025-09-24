<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = ['title', 'description', 'image'];
    protected $table = 'gallery';
    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }
}
