<?php

namespace App\Models;

use App\Traits\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Major extends Model
{
    use SoftDeletes, HasImageUrl;

    protected $fillable = ['name', 'description', 'image'];

    public function partners()
    {
        return $this->hasMany(Partner::class);
    }

    public function chanceCarriers()
    {
        return $this->hasMany(ChanceCarrier::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
