<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasImageUrl
{
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return Storage::url($this->image);
    }
}
