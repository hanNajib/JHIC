<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'superadmin',
            'email' => 'superadmin@smkn8jember.sch.id',
            'password' => Hash::make('supaadminrawr'),
            'role' => 'superadmin',
            'phone_number' => '1234567890',
            'bio' => 'Superadmin'
        ]);
    }
}
