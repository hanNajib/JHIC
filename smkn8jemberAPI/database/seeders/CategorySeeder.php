<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            "type" => "announcements",
            "name" => "Info",
            "color" => "#0800E1"
        ]);

        Category::create([
            "type" => "announcements",
            "name" => "Penting",
            "color" => "#E10000"
        ]);
    }
}
