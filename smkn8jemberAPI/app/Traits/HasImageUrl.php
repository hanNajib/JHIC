<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasImageUrl
{
    public function getImageAttribute($value): ?string
    {
        return $value ? url(Storage::url($value)) : null;
    }

    public function OriginalImagePath(): ?string
    {
        return $this->attributes['image'] ?? null;
    }
}
