<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            PengumumanSeeder::class,
            ArticleSeeder::class,
            CategorySeeder::class,
            SchoolSettingsSeeder::class,
            SchoolDataSeeder::class,
            StaffSeeder::class,
            MajorSeeder::class,
            ChanceCarrierSeeder::class,
            SubjectSeeder::class,
        ]);
    }
}
