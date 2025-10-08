<?php

namespace Database\Seeders;

use App\Models\SchoolSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listSettings = [
            [
                'title' => 'judul_halaman',
                'value' => 'SMK Negeri 8 Jember WES TOP',
            ],
            [
                'title' => 'deskripsi_halaman',
                'value' => 'Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas, dengan menyiapkan lulusan yang siap kerja, siap berwirausaha, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi.',
            ],
            [
                'title' => 'deskripsi_footer',
                'value' => 'Sekolah Menengah Kejuruan yang berkomitmen menghasilkan lulusan berkualitas dan siap kerja di era digital.',
            ],
            [
                'title' => 'deskripsi_about',
                'value' => 'SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik.',
            ],
            [
                'title' => 'kata_sambutan',
                'value' => 'SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik.',
            ],
            [
                'title' => 'tahun_berdiri',
                'value' => '1996',
            ],
            [
                'title' => 'logo_sekolah',
                'value' => 'default-logo.png',
            ],
            [
                'title' => 'hero_image',
                'value' => 'default-hero.jpg',
            ],
            [
                'title' => 'youtube_link',
                'value' => 'https://www.youtube.com/@smkn8jemberofficial',
            ],
            [
                'title' => 'facebook_link',
                'value' => 'https://www.facebook.com/profile.php?id=61556186803408'
            ],
            [
                'title' => 'instagram_link',
                'value' => 'https://www.instagram.com/smkn8_official/'
            ],
            [
                'title' => 'email',
                'value' => 'smkn8jember@gmail.com'
            ],
            [
                'title' => 'telepon',
                'value' => '(0336) 444112'
            ],
            [
                'title' => 'alamat',
                'value' => 'Jl. Pelita no 27 Sidomekar - Semboro - Jember, Jawa Timur, Indonesia'
            ],
        ];

        foreach ($listSettings as $setting) {
            SchoolSetting::updateOrCreate(
                ['title' => $setting['title']],
                ['value' => $setting['value']]
            );
        }
    }
}
