<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'phone_number',
        'bio'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function isSuperAdmin()
    {
        return $this->role === 'superadmin';
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class, 'author_id');
    }

    /**
     * Find user by email or username.
     *
     * @param array $login
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function whereLogin(array $login): Builder
    {
        if (empty($login['email']) && empty($login['username'])) {
            return self::whereRaw('0 = 1');
        }

        return self::where(function ($query) use ($login) {
            if (!empty($login['email'])) {
                $query->where('email', $login['email']);
            }
            if (!empty($login['username'])) {
                $query->orWhere('username', $login['username']);
            }
        });
    }


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}
