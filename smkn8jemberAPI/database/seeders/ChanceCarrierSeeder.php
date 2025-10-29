<?php

namespace Database\Seeders;

use App\Models\ChanceCarrier;
use App\Models\Major;
use Illuminate\Database\Seeder;

class ChanceCarrierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get majors by short_name
        $majorTSM = Major::where('short_name', 'TSM')->first();
        $majorTKR = Major::where('short_name', 'TKR')->first();
        $majorRPL = Major::where('short_name', 'RPL')->first();
        $majorTKJ = Major::where('short_name', 'TKJ')->first();
        $majorDKV = Major::where('short_name', 'DKV')->first();
        $majorATPH = Major::where('short_name', 'ATPH')->first();
        $majorPPT = Major::where('short_name', 'PPT')->first();

        $careers = [
            [
                'name' => 'Teknisi Sepeda Motor',
                'salary' => '2500000',
                'major_id' => $majorTSM?->id,
                'icon' => 'Io5Bicycle',
            ],
            [
                'name' => 'Mekanik Bengkel',
                'salary' => '2000000',
                'major_id' => $majorTSM?->id,
                'icon' => 'FaWrench',
            ],
            [
                'name' => 'Pengusaha Bengkel Motor',
                'salary' => '5000000',
                'major_id' => $majorTSM?->id,
                'icon' => 'BiShop',
            ],

            // Teknik Kendaraan Ringan
            [
                'name' => 'Teknisi Kendaraan Ringan',
                'salary' => '3000000',
                'major_id' => $majorTKR?->id,
                'icon' => 'FaCar',
            ],
            [
                'name' => 'Mekanik Otomotif',
                'salary' => '2500000',
                'major_id' => $majorTKR?->id,
                'icon' => 'FaWrench',
            ],
            [
                'name' => 'Service Advisor',
                'salary' => '3500000',
                'major_id' => $majorTKR?->id,
                'icon' => 'MdAssignment',
            ],

            // Rekayasa Perangkat Lunak
            [
                'name' => 'Programmer',
                'salary' => '5000000',
                'major_id' => $majorRPL?->id,
                'icon' => 'RiCode2Line',
            ],
            [
                'name' => 'Web Developer',
                'salary' => '5500000',
                'major_id' => $majorRPL?->id,
                'icon' => 'FaGlobe',
            ],
            [
                'name' => 'Mobile Developer',
                'salary' => '6000000',
                'major_id' => $majorRPL?->id,
                'icon' => 'BiMobilePhone',
            ],

            // Teknik Komputer Jaringan
            [
                'name' => 'Network Administrator',
                'salary' => '4500000',
                'major_id' => $majorTKJ?->id,
                'icon' => 'MdRouter',
            ],
            [
                'name' => 'IT Support',
                'salary' => '3500000',
                'major_id' => $majorTKJ?->id,
                'icon' => 'MdSupportAgent',
            ],
            [
                'name' => 'System Administrator',
                'salary' => '5000000',
                'major_id' => $majorTKJ?->id,
                'icon' => 'FaCog',
            ],

            // Desain Komunikasi Visual
            [
                'name' => 'Graphic Designer',
                'salary' => '4000000',
                'major_id' => $majorDKV?->id,
                'icon' => 'MdDesignServices',
            ],
            [
                'name' => 'UI/UX Designer',
                'salary' => '5000000',
                'major_id' => $majorDKV?->id,
                'icon' => 'BiPencilRuler',
            ],
            [
                'name' => 'Motion Graphics Designer',
                'salary' => '4500000',
                'major_id' => $majorDKV?->id,
                'icon' => 'MdMovieCreation',
            ],

            // Agribisnis Tanaman Pangan dan Hortikultura
            [
                'name' => 'Petani Modern',
                'salary' => '3500000',
                'major_id' => $majorATPH?->id,
                'icon' => 'IoGlobe',
            ],
            [
                'name' => 'Agribisnis Entrepreneur',
                'salary' => '6000000',
                'major_id' => $majorATPH?->id,
                'icon' => 'FaBriefcase',
            ],
            [
                'name' => 'Quality Control Pertanian',
                'salary' => '3000000',
                'major_id' => $majorATPH?->id,
                'icon' => 'BiCheckCircle',
            ],

            [
                'name' => 'Teknisi Benih',
                'salary' => '3000000',
                'major_id' => $majorPPT?->id,
                'icon' => 'BiLeaf',
            ],
            [
                'name' => 'Pemulia Tanaman',
                'salary' => '4000000',
                'major_id' => $majorPPT?->id,
                'icon' => 'BiSprout',
            ],
            [
                'name' => 'Entrepreneur Benih',
                'salary' => '5500000',
                'major_id' => $majorPPT?->id,
                'icon' => 'BiShop',
            ],
        ];

        foreach ($careers as $career) {
            if ($career['major_id']) {
                ChanceCarrier::create($career);
            }
        }
    }
}
