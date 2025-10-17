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
                'value' => 'SMK Negeri 8 Jember<br>WES TOP',
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
                'value' => '2008',
            ],
            [
                'title' => 'logo_sekolah',
                'type' => 'image',
                'value' => 'https://raw.githubusercontent.com/hanNajib/AssetsJHIC/refs/heads/main/Logo%20SMKN%208%20Jember%20Vektor.png',
            ],
            [
                'title' => 'hero_image',
                'type' => 'image',
                'value' => 'https://raw.githubusercontent.com/hanNajib/AssetsJHIC/refs/heads/main/hero.png',
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
                'value' => 'smknegeri08jember@gmail.com'
            ],
            [
                'title' => 'telepon',
                'value' => '(0336) 444112'
            ],
            [
                'title' => 'alamat',
                'value' => 'Jl. Pelita no 27 Sidomekar - Semboro - Jember, Jawa Timur, Indonesia'
            ],
            [
                'title' => 'visi',
                'value' => 'Terwujudnya lulusan yang berprofil Pelajar Pancasila sehingga mampu bersaing di dunia kerja dan Perguruan Tinggi, serta tumbuh jiwa wirausaha'
            ],
            [
                'title' => 'misi',
                'value' => '<ol><li>Meningkatkan softskill peserta didik yang berprofil pelajar Pancasila dan sesuai dengan kebutuhan dunia kerja.</li><li>Mensinkronkan Kurikulum secara kontekstual terhadap tuntutan kebutuhan dan perkembangan dunia kerja.</li><li>Menerapkan pembelajaran yang berpusat pada peserta didik dengan pembelajaran berbasis projek nyata dari dunia kerja.</li><li>Meningkatkan kompetensi pendidik dan tenaga kependidikan sesuai dengan perkembangan teknologi terkini dan berdedikasi tinggi.</li><li>Mewujudkan kelas wirausaha untuk menumbuhkan jiwa wirausaha peserta didik.</li><li>Menerapkan pola pengelolaan keuangan Badan Layanan Umum Daerah.</li><li>Meningkatkan mutu sarana dan prasarana serta lingkungan belajar yang sesuai standar pendidikan dan standar kerja industri.</li><li>Menerapkan budaya kerja industri bagi semua warga sekolah.</li><li>Menjalin kemitraan dengan stakeholder untuk menyelenggarakan pendidikan berbasis Teaching Factory, pelatihan, magang, dan perekrutan lulusan.</li></ol>'
            ]
        ];

        foreach ($listSettings as $setting) {
            SchoolSetting::updateOrCreate(
                ['title' => $setting['title']],
                ['value' => $setting['value']]
            );
        }
    }
}
