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

        Category::create([
            "type" => "major",
            "name" => "TSM",
            "color" => "#FF6B35"
        ]);

        Category::create([
            "type" => "major",
            "name" => "TKR",
            "color" => "#F7931E"
        ]);

        Category::create([
            "type" => "major",
            "name" => "RPL",
            "color" => "#00A8E1"
        ]);

        Category::create([
            "type" => "major",
            "name" => "TKJ",
            "color" => "#1E90FF"
        ]);

        Category::create([
            "type" => "major",
            "name" => "DKV",
            "color" => "#9D4EDD"
        ]);

        Category::create([
            "type" => "major",
            "name" => "ATPH",
            "color" => "#06A77D"
        ]);

        Category::create([
            "type" => "major",
            "name" => "APT",
            "color" => "#2D6A4F"
        ]);
    }
}
