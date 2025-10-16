<?php

namespace Database\Seeders;

use App\Models\SchoolData;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listSettings = [
            [
                'name' => 'Kelas10',
                'value' => '472',
                'type' => 'string',
            ],
            [
                'name' => 'Kelas11',
                'value' => '477',
                'type' => 'string',
            ],
            [
                'name' => 'Kelas12',
                'value' => '477',
                'type' => 'string',
            ],
            [
                'name' => 'JumlahSiswa',
                'value' => '769',
                'type' => 'string',
            ],
            [
                'name' => 'JumlahSiswi',
                'value' => '777',
                'type' => 'string',
            ],
            [
                'name' => 'JumlahRombelKelas',
                'value' => '56',
                'type' => 'string',
            ],
        ];

        foreach ($listSettings as $setting) {
            SchoolData::updateOrCreate(
                ['name' => $setting['name']],
                [
                    'value' => $setting['value'],
                    'type'  => $setting['type'],
                ]
            );
        }
    }
}
