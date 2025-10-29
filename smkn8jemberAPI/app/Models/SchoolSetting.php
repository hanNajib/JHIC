<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class SchoolSetting extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'type', 'value'];

    public $availableSettings = [
        'judul_halaman',
        'deskripsi_halaman',
        'deskripsi_halaman',
        'deskripsi_about',
        'kata_sambutan',
        'tahun_berdiri',
        'logo_sekolah',
        'hero_image',
        'youtube_link',
        'facebook_link',
        'instagram_link',
        'email',
        'telepon',
        'alamat',
        'visi',
        'misi',
    ];

    public static function whereSetting($title): Builder
    {
        return self::where('title', $title);
    }

    public function getValueAttribute($value) {
        if ($this->type === 'image' && !empty($value)) {
            if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
                return $value;
            }
            return url(Storage::url($value));
        }
        return $value;
    }
}
