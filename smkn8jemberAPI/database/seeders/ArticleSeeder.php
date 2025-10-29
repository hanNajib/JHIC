<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil user pertama sebagai author (atau buat jika belum ada)
        $author = User::first();

        if (!$author) {
            echo "Warning: No user found. Please run AdminSeeder first.\n";
            return;
        }

        // Buat kategori artikel jika belum ada
        $categories = [];
        $categoryTypes = [
            ['type' => 'articles', 'name' => 'RPL', 'color' => '#f97316'], //0 /
            ['type' => 'articles', 'name' => 'TKJ', 'color' => '#f97316'], //1 /
            ['type' => 'articles', 'name' => 'DKV', 'color' => '#f97316'], //2 /
            ['type' => 'articles', 'name' => 'TSM', 'color' => '#f97316'], //3 /
            ['type' => 'articles', 'name' => 'TKR', 'color' => '#f97316'], //4 /
            ['type' => 'articles', 'name' => 'APT', 'color' => '#f97316'], //5 /
            ['type' => 'articles', 'name' => 'ATPH', 'color' => '#f97316'], //6 /
            ['type' => 'articles', 'name' => 'Prestasi', 'color' => '#f97316'], //7 /
            ['type' => 'articles', 'name' => 'Event', 'color' => '#f97316'], //8 /
            ['type' => 'articles', 'name' => 'Karya', 'color' => '#f97316'], //9 /
            ['type' => 'articles', 'name' => 'Ekstrakulikuler', 'color' => '#f97316'], //10 /
            ['type' => 'articles', 'name' => 'Kunjungan', 'color' => '#f97316'], //11 /
            ['type' => 'articles', 'name' => 'TEFA', 'color' => '#f97316'], //12 /
            ['type' => 'articles', 'name' => 'Keagamaan', 'color' => '#f97316'], //13 /
            ['type' => 'articles', 'name' => 'Edukasi', 'color' => '#f97316'], //14 /
        ];

        foreach ($categoryTypes as $catData) {
            $categories[] = Category::firstOrCreate(
                ['type' => $catData['type'], 'name' => $catData['name']],
                ['color' => $catData['color']]
            );
        }

        // Array sample artikel
        $articles = [
            [
                'title' => 'SMKN 8 Jember dengan menyapu bersih kategori dalam kompetisi GEMPITA 2024 yang diselenggarakan oleh PT. Petro Kimia Gresik',
                'content' => '<p>SMKN 8 Jember kembali menorehkan prestasi luar biasa dalam ajang <strong>GEMPITA 2024</strong> yang diselenggarakan oleh <strong>PT. Petrokimia Gresik</strong>. Dalam kompetisi bergengsi tersebut, tim dari SMKN 8 Jember berhasil menyapu bersih seluruh kategori utama, mengungguli puluhan peserta dari berbagai sekolah di Jawa Timur. Keberhasilan ini menjadi bukti nyata dedikasi, kerja keras, dan semangat juang siswa dalam mengembangkan potensi di bidang pertanian dan teknologi.</p>
                <p>Dalam ajang tersebut, <strong>Nindhta Fajar Andriani</strong> dari kelas <strong>XI ATPH 1</strong> berhasil meraih gelar <em>Best Presenter</em> berkat kemampuan luar biasa dalam menyampaikan ide dan hasil penelitian secara komunikatif dan inspiratif. Penampilan Nindhta yang penuh percaya diri dan data yang disajikan secara ilmiah membuat para juri terkesan, menjadikannya salah satu peserta paling berpengaruh di antara seluruh finalis.</p>
                <p>Sementara itu, <strong>Muh. Habibur Rohim</strong> dari kelas <strong>XI APT 2</strong> sukses meraih <strong>Juara 1 Umum</strong> dalam kategori utama. Karya inovatif yang ia presentasikan mengangkat tema pemanfaatan bahan alami sebagai alternatif ramah lingkungan, yang dinilai memiliki potensi besar untuk diterapkan di dunia industri. Prestasi ini sekaligus mengantarkan SMKN 8 Jember menjadi sekolah dengan perolehan nilai tertinggi secara keseluruhan di ajang GEMPITA 2024.</p>
                <p>Tak kalah membanggakan, <strong>Agra Maulana Putra</strong> dari kelas <strong>XI APT 1</strong> juga berhasil menyabet penghargaan sebagai <em>The Most Voted Poster GEMPITA</em>. Karyanya yang menarik secara visual dan memiliki pesan edukatif tinggi mendapatkan apresiasi luas dari pengunjung dan peserta lainnya. Dengan pencapaian luar biasa ini, SMKN 8 Jember menegaskan posisinya sebagai sekolah unggulan yang terus berinovasi dan berprestasi di tingkat nasional.</p>
                ',
                'status' => 'published',
                'categories' => [5, 7],
                'image' => 'gempita.png',
            ],
            [
                'title' => 'Program Keahlian Pertanian Ikuti Expo SMK Jatim 2024',
                'content' => '<p>Dengan hormat, Jurusan Pertanian SMKN 8 Jember menerima undangan resmi untuk berpartisipasi dalam <strong>Expo &amp; Expose SMK Jatim 2024</strong> di bidang Agronomi. Kegiatan ini merupakan kesempatan strategis untuk memamerkan hasil karya siswa, praktik budidaya, dan inovasi teknologi pertanian yang telah dikembangkan di sekolah. Delegasi dari jurusan akan terdiri dari guru pembimbing dan beberapa tim siswa yang siap melakukan presentasi serta demonstrasi lapangan. 
                Partisipasi ini diharapkan meningkatkan jejaring kerjasama antara SMKN 8 Jember dan berbagai stakeholder pertanian di tingkat provinsi.
                </p>
                <p>
                Pada kesempatan expo, tim Pertanian akan menampilkan <em>stand</em> berisi prototipe alat pertanian sederhana, poster penelitian siswa, serta contoh produk olahan hasil tani. 
                Selain pameran, tim juga telah menyiapkan materi presentasi tentang teknik budidaya ramah lingkungan dan manajemen lahan skala kecil yang mudah diaplikasikan oleh petani lokal. 
                Panitia expo menyediakan sesi tanya jawab dan penjurian, sehingga siswa dapat langsung menerima masukan dari praktisi dan akademisi yang hadir. 
                Kami mendorong seluruh peserta untuk menunjukkan profesionalisme dan etika akademik selama kegiatan berlangsung.
                </p>

                <p>
                Sekolah menginstruksikan persiapan administrasi dan logistik dimulai secepatnya, termasuk persiapan alat peraga, dokumen pendukung, dan jadwal presentasi. 
                Semua siswa yang ditunjuk untuk mewakili jurusan wajib hadir pada sesi latihan teknis dan simulasi presentasi yang akan dipandu oleh guru pembimbing. 
                Selain itu, pihak sekolah akan mengurus izin dan transportasi serta memastikan protokol keselamatan dan kesehatan dipatuhi selama kegiatan. 
                Harapannya, pengalaman expo ini menjadi bekal berharga bagi siswa dalam mengembangkan karier vokasi di sektor pertanian.
                </p>

                <p>
                Kami mengucapkan terima kasih kepada semua pihak yang telah mendukung proses undangan ini dan berharap kerja sama yang terjalin dapat berlanjut pasca-expo. 
                Bagi siswa dan guru yang berpartisipasi, kesempatan ini juga dapat menjadi pintu pembuka untuk mendapatkan mitra industri, proyek magang, atau ajang lomba selanjutnya. 
                Sekolah mengimbau civitas akademika untuk memberikan dukungan moral dan promosi agar partisipasi jurusan Pertanian mendapatkan perhatian maksimal. 
                Demikian pemberitahuan ini kami sampaikan; semoga keikutsertaan SMKN 8 Jember dalam Expo SMK Jatim 2024 membawa manfaat besar bagi seluruh pihak.
                </p>',
                'status' => 'published',
                'categories' => [5, 6],
                'image' => 'exspo.png',
            ],
            [
                'title' => 'Kegiatan Donor Darah yang dilakukan oleh PMR Wira SMKN 8 Jember',
                'content' => '<p>Ekstrakurikuler Palang Merah Remaja (PMR) Wira SMKN 8 Jember sukses menyelenggarakan kegiatan donor darah pada hari Rabu (18/12) di aula utama sekolah. Kegiatan ini bekerja sama dengan Unit Donor Darah (UDD) PMI Kabupaten Jember dan diikuti oleh siswa, guru, serta staf tata usaha yang antusias berpartisipasi. Tujuan utama kegiatan ini adalah menumbuhkan rasa kepedulian sosial dan kemanusiaan di kalangan warga sekolah.</p>

                <p>Ketua PMR Wira SMKN 8 Jember menyampaikan bahwa kegiatan donor darah ini merupakan program rutin yang dilaksanakan setiap semester. Menurutnya, kegiatan ini tidak hanya menjadi bentuk pengabdian sosial, tetapi juga sarana edukasi bagi anggota PMR untuk belajar mengelola kegiatan kemanusiaan secara langsung. Ia juga menambahkan bahwa minat peserta meningkat dibandingkan tahun sebelumnya.</p>

                <p>Pelaksanaan donor darah berlangsung tertib dan lancar. Setiap peserta terlebih dahulu menjalani pemeriksaan kesehatan ringan oleh petugas PMI sebelum dinyatakan layak mendonorkan darah. Para petugas medis yang hadir memastikan seluruh prosedur dijalankan sesuai standar keamanan dan kebersihan, sehingga peserta merasa nyaman selama proses berlangsung.</p>

                <p>Kepala SMKN 8 Jember turut memberikan apresiasi kepada seluruh panitia dan peserta yang telah berpartisipasi. Beliau berharap kegiatan seperti ini terus dilanjutkan dan menjadi bagian dari budaya sekolah yang peduli terhadap sesama. Dengan adanya kegiatan donor darah ini, diharapkan siswa SMKN 8 Jember semakin memahami pentingnya berbagi dan menolong orang lain melalui tindakan nyata.</p>
',
                'status' => 'published',
                'categories' => [10],
                'image' => 'pmr.png',
            ],
            [
                'title' => 'Dies Natalis ke-16 SMKN 8 Jember: Menuju Vokasi Unggul dan Berprestasi',
                'content' => '<p>Pada hari Selasa, 17 Desember 2025, SMKN 8 Jember merayakan Dies Natalis ke-16 dengan penuh semangat dan kebahagiaan. Seluruh warga sekolah, mulai dari guru, staf, hingga siswa, turut berpartisipasi dalam kegiatan yang berlangsung meriah di halaman utama sekolah. Acara ini menjadi momentum penting untuk mengenang perjalanan panjang sekolah dalam mencetak generasi vokasi yang unggul dan berdaya saing tinggi.</p>
                <p>Perayaan tahun ini mengusung tema <em>“16 Tahun Menuju Vokasi Unggul dan Berprestasi”</em> yang mencerminkan komitmen SMKN 8 Jember dalam meningkatkan kualitas pendidikan kejuruan. Kepala sekolah dalam sambutannya menyampaikan apresiasi atas kerja keras seluruh pihak yang telah berkontribusi dalam memajukan sekolah, serta menekankan pentingnya inovasi di setiap jurusan untuk menghadapi tantangan dunia kerja yang terus berkembang.</p>
                <p>Berbagai kegiatan menarik turut memeriahkan acara, mulai dari lomba kreativitas antarjurusan, pameran hasil karya siswa, hingga pertunjukan seni dan musik yang menampilkan bakat-bakat terbaik dari peserta didik. Tak hanya itu, sejumlah alumni juga hadir memberikan motivasi dan berbagi pengalaman kepada adik-adik kelas mereka tentang dunia industri dan wirausaha.</p>
                <p>Acara puncak ditandai dengan pemotongan tumpeng dan doa bersama sebagai bentuk rasa syukur atas pencapaian yang telah diraih selama enam belas tahun berdirinya SMKN 8 Jember. Suasana haru dan bahagia menyelimuti seluruh peserta, diiringi harapan agar sekolah terus berkembang menjadi lembaga pendidikan vokasi yang berprestasi dan berkarakter.</p>
                <p>Dengan semangat Dies Natalis ke-16 ini, keluarga besar SMKN 8 Jember berkomitmen untuk terus melangkah maju menuju masa depan yang lebih baik. Diharapkan seluruh siswa mampu menjadi generasi yang unggul, berakhlak mulia, dan siap menghadapi tantangan global dengan kemampuan serta keterampilan terbaik yang dimiliki.</p>',
                'status' => 'published',
                'categories' => [8],
                'image' => 'diesnatalis.png',
            ],
            [
                'title' => 'Prestasi Gemilang Siswa SMKN 8 Jember di Kejurda Aeromodelling 2024',
                'content' => '<p>SMKN 8 Jember kembali menorehkan prestasi membanggakan melalui dua siswanya yang berhasil meraih juara pada ajang <strong>Kejuaraan Daerah (Kejurda) Control Line Jawa Timur 2024</strong> cabang olahraga Aeromodelling. 
                Kompetisi ini diikuti oleh puluhan peserta dari berbagai daerah di Jawa Timur yang menampilkan kemampuan luar biasa dalam bidang teknologi dan ketepatan kendali pesawat mini.</p>

                <p><strong>Naylatul Maqviroh</strong> dari kelas XII TKRO 3 berhasil meraih <strong>Juara 3 F2A Speed U19 Putri</strong>, 
                sementara <strong>Hendra P</strong> dari kelas XII TSM 2 juga sukses menempati posisi <strong>Juara Harapan 1 F2A Speed U19 Putra</strong>. 
                Kedua siswa ini telah menunjukkan semangat tinggi, ketekunan, dan keterampilan teknis yang luar biasa selama proses latihan maupun perlombaan berlangsung.</p>

                <p>Pembina ekstrakurikuler Aeromodelling SMKN 8 Jember menyampaikan rasa syukur dan bangganya atas pencapaian ini. 
                Menurutnya, prestasi tersebut menjadi bukti nyata bahwa kegiatan ekstrakurikuler di sekolah bukan hanya sebagai wadah hobi, tetapi juga sarana pengembangan kemampuan siswa dalam bidang sains, teknologi, dan olahraga udara.</p>

                <p>Kepala SMKN 8 Jember juga memberikan apresiasi tinggi kepada para juara serta guru pembimbing yang telah bekerja keras membimbing siswa hingga mencapai hasil yang membanggakan. 
                Ia berharap prestasi ini dapat menjadi inspirasi bagi siswa lainnya untuk terus berprestasi, baik di bidang akademik maupun non-akademik, demi mengharumkan nama SMKN 8 Jember di tingkat regional maupun nasional.</p>
                ',
                'status' => 'published',
                'categories' => [4, 7],
                'image' => 'aeromodeling.png',
            ],
            [
                'title' => 'Tim Ekstrakurikuler Tari Eskalaber Wakili Kecamatan Semboro di Alun-Alun Jember Nusantara',
                'content' => '<p>
                    Tim ekstrakurikuler tari SMKN 8 Jember, yang dikenal dengan nama <strong>Eskalaber Dance Team</strong>, kembali menorehkan prestasi membanggakan. 
                    Pada Selasa, <strong>31 Desember 2024</strong>, tim ini berkesempatan mewakili <em>Kecamatan Semboro</em> untuk tampil dalam acara <strong>Jember Nusantara</strong> yang digelar di Alun-alun Jember. 
                    Kegiatan ini diikuti oleh berbagai tim tari dari seluruh kecamatan di Kabupaten Jember, menampilkan keberagaman budaya dan kreativitas para pelajar.
                    </p>

                    <p>
                    Dalam penampilan tersebut, tim Eskalaber membawakan tarian bertema <em>“Pesona Budaya Tapal Kuda”</em> yang menggambarkan semangat, keindahan, dan kearifan lokal masyarakat Jember. 
                    Gerakan yang dinamis, kostum yang penuh warna, serta ekspresi yang kuat berhasil memukau penonton dan para juri. 
                    Tidak hanya menonjol dari segi teknik tari, tetapi juga dari penjiwaan dan kekompakan antaranggota.
                    </p>

                    <p>
                    Kepala SMKN 8 Jember menyampaikan rasa bangga dan apresiasi yang tinggi atas pencapaian tersebut. 
                    Menurutnya, prestasi ini menjadi bukti bahwa kegiatan ekstrakurikuler tidak hanya menjadi wadah pengembangan bakat, 
                    namun juga sarana untuk mengharumkan nama sekolah di tingkat kabupaten bahkan lebih luas lagi. 
                    Beliau berharap semangat berkarya para siswa terus tumbuh dan menginspirasi generasi berikutnya.
                    </p>

                    <p>
                    Pembina ekstrakurikuler tari menambahkan bahwa proses latihan dilakukan secara intensif selama dua bulan penuh menjelang acara. 
                    Para anggota tim menunjukkan dedikasi dan disiplin yang tinggi dalam menyiapkan setiap koreografi. 
                    Dukungan penuh dari pihak sekolah, guru, dan orang tua juga menjadi kunci keberhasilan tim ini dalam mencapai hasil terbaik.
                    </p>

                    <p>
                    Dengan tampilnya tim Eskalaber di acara bergengsi tersebut, SMKN 8 Jember semakin dikenal sebagai sekolah yang tidak hanya unggul dalam bidang akademik, 
                    tetapi juga aktif dalam kegiatan seni dan budaya. 
                    Prestasi ini diharapkan menjadi motivasi bagi seluruh siswa untuk terus mengembangkan potensi diri di berbagai bidang.
                    </p>
',
                'status' => 'published',
                'categories' => [10, 7],
                'image' => 'tari.png',
            ],
            [
                'title' => 'Tim Ekstrakurikuler Tari Eskalaber Wakili Kecamatan Semboro di Alun-Alun Jember Nusantara',
                'content' => '<p>SMKN 8 Jember kembali menorehkan prestasi gemilang dalam ajang <strong>Kejuaraan Film Moderasi Beragama Tingkat Provinsi Jawa Timur</strong> yang diselenggarakan oleh Kantor Wilayah Kementerian Agama Jawa Timur. Kompetisi ini diikuti oleh berbagai sekolah menengah kejuruan yang menampilkan karya film pendek bertema toleransi dan kerukunan antarumat beragama.</p>

                <p>Dalam ajang bergengsi tersebut, tim produksi film SMKN 8 Jember berhasil memukau dewan juri dengan karya berjudul <em>"Cahaya Toleransi"</em>. Film ini mengangkat kisah sederhana tentang kehidupan pelajar yang belajar memahami perbedaan agama di lingkungan sekolah. Pesan moral yang disampaikan dengan visual yang kuat membuat karya ini mendapatkan apresiasi tinggi dari para penonton dan juri.</p>

                <p>Guru pembimbing tim film, <strong>Bapak Arif Setiawan, S.Pd</strong>, menyampaikan rasa bangga atas kerja keras para siswa. Menurutnya, pencapaian ini tidak hanya membanggakan sekolah, tetapi juga menjadi bukti bahwa semangat moderasi beragama dapat diwujudkan melalui karya kreatif yang inspiratif. Ia berharap kegiatan seperti ini dapat terus dilaksanakan untuk menumbuhkan semangat toleransi di kalangan generasi muda.</p>

                <p>Kepala SMKN 8 Jember, <strong>Ibu Dra. Siti Rahayu</strong>, juga memberikan apresiasi kepada seluruh tim yang telah berjuang membawa nama baik sekolah. Beliau menegaskan bahwa sekolah akan terus mendukung pengembangan bakat siswa di bidang perfilman dan seni digital. Harapannya, prestasi ini menjadi motivasi bagi siswa lain untuk terus berkarya secara positif dan produktif.</p>

                <p>Dengan keberhasilan ini, SMKN 8 Jember semakin memperkuat reputasinya sebagai sekolah yang tidak hanya unggul di bidang akademik dan teknologi, tetapi juga aktif dalam membangun karakter dan nilai-nilai kebangsaan melalui karya nyata. Prestasi ini menjadi bukti bahwa pendidikan berbasis karakter dan kreatifitas mampu mencetak generasi muda yang toleran, berdaya saing, dan berakhlak mulia.</p>
                ',
                'status' => 'published',
                'categories' => [7],
                'image' => 'film.png',
            ],
            [
                'title' => 'Prestasi Gemilang Ekstrakurikuler Pencak Silat SMKN 8 Jember Raih Juara 2 Nasional',
                'content' => '<p>Selamat dan sukses kami ucapkan kepada <strong>Ekstrakurikuler Pencak Silat SMKN 8 Jember</strong> yang telah menorehkan prestasi membanggakan pada ajang <em>Jember Championship 2</em> Tahun 2025. Kejuaraan tingkat nasional tersebut diikuti oleh berbagai sekolah dari seluruh Indonesia dan menjadi ajang pembuktian kemampuan bela diri para siswa terbaik.</p>

                        <p>Adapun para atlet yang berpartisipasi sekaligus membawa pulang medali untuk SMKN 8 Jember antara lain: <br>
                        1. Ryo Pradana (XII DKV 2) – <strong>Medali Emas</strong><br>
                        2. Bobig Wijaya Liem (X ATPH 1) – <strong>Medali Emas</strong><br>
                        3. M. Dedy S (X TKJ 1) – <strong>Medali Emas</strong><br>
                        4. Aris Setiawan (XI TSM 2) – <strong>Medali Perak</strong><br>
                        5. Fina Wardatul (X RPL 1) – <strong>Medali Perak</strong><br>
                        6. Farhan Aby (XI TKR 2) – <strong>Medali Perunggu</strong></p>

                        <p>Dengan semangat juang tinggi, para peserta menunjukkan teknik dan kedisiplinan yang luar biasa di atas gelanggang. Hasil ini tidak hanya mencerminkan kemampuan individu, tetapi juga kekompakan dan kerja keras tim dalam berlatih di bawah bimbingan pelatih serta dukungan penuh dari pihak sekolah.</p>

                        <p>Kepala SMKN 8 Jember menyampaikan apresiasi dan rasa bangga atas pencapaian luar biasa tersebut. Beliau berharap prestasi ini dapat menjadi inspirasi bagi siswa lainnya untuk terus berprestasi di bidang akademik maupun non-akademik, serta menjaga semangat juang yang tinggi dalam setiap kegiatan sekolah.</p>

                        <p>Dengan raihan ini, SMKN 8 Jember resmi dinobatkan sebagai <strong>Juara 2 Umum Remaja</strong> pada Kejuaraan Pencak Silat Tingkat Nasional 2025. Prestasi ini menjadi bukti nyata bahwa kerja keras, disiplin, dan semangat pantang menyerah selalu berbuah manis bagi mereka yang berusaha dengan sungguh-sungguh.</p>
                        ',
                'status' => 'published',
                'categories' => [10, 7],
                'image' => 'silat.png',
            ],
            [
                'title' => 'Sosialisasi Perguruan Tinggi oleh Alumni SMKN 8 Jember',
                'content' => '<p>Pada hari Rabu dan Kamis, tanggal 15–16 Januari 2025, telah dilaksanakan kegiatan <strong>Sosialisasi Perguruan Tinggi</strong> oleh para alumni SMKN 8 Jember yang kini menempuh pendidikan di berbagai universitas ternama. Beberapa kampus yang turut diwakili antara lain <em>Universitas Jember (UNEJ)</em>, <em>Politeknik Negeri Jember (Polije)</em>, <em>UIN KHAS Jember</em>, <em>Universitas Terbuka (UT)</em>, serta beberapa perguruan tinggi lainnya.</p>

                <p>Kegiatan ini ditujukan bagi siswa-siswi kelas XII dan XIII SMKN 8 Jember. Dalam kegiatan tersebut, para alumni membagikan pengalaman pribadi, mulai dari proses pendaftaran kuliah, tips menghadapi seleksi masuk perguruan tinggi, hingga gambaran kehidupan perkuliahan yang sesungguhnya. Sesi ini berlangsung interaktif dengan tanya jawab langsung antara siswa dan alumni.</p>

                <p>Selain memberikan motivasi, para alumni juga menekankan pentingnya <strong>perencanaan karier sejak dini</strong>. Mereka mengajak para siswa untuk mengenali minat dan bakat masing-masing agar dapat memilih jurusan kuliah yang sesuai. Diharapkan dengan adanya sosialisasi ini, siswa menjadi lebih siap dan memiliki arah yang jelas dalam melanjutkan pendidikan ke jenjang yang lebih tinggi.</p>

                <p>Kegiatan sosialisasi ini disambut antusias oleh para siswa. Kepala SMKN 8 Jember menyampaikan apresiasi dan ucapan terima kasih kepada para alumni yang telah meluangkan waktu untuk berbagi pengalaman berharga. Beliau berharap kegiatan seperti ini dapat menjadi agenda rutin setiap tahun sebagai bentuk kepedulian alumni terhadap adik kelasnya.</p>
                ',
                'status' => 'published',
                'categories' => [14],
                'image' => 'sosialisasi.png',
            ],
            [
                'title' => 'Pembukaan Kelas Industri RPL Bersama PT. Humma Teknologi Indonesia',
                'content' => '<p>SMKN 8 Jember telah resmi melaksanakan kegiatan <strong>Pembukaan Kelas Industri Jurusan Rekayasa Perangkat Lunak (RPL)</strong> yang bekerja sama dengan <strong>PT. Humma Teknologi Indonesia</strong>. Kegiatan ini menjadi langkah nyata sekolah dalam memperkuat sinergi antara dunia pendidikan dan dunia industri guna meningkatkan mutu pembelajaran berbasis keahlian.</p>

                <p>Acara pembukaan berlangsung di aula utama sekolah dengan dihadiri oleh guru, siswa jurusan RPL, serta perwakilan dari PT. Humma Teknologi Indonesia. Suasana penuh antusiasme tampak ketika pihak industri memberikan gambaran mengenai prospek karier di bidang teknologi informasi dan pentingnya kompetensi praktis di dunia kerja.</p>

                <p>Dalam sambutannya, <strong>Ibu Putri Maulidya</strong> selaku Wakil Kepala Sekolah Bidang Kurikulum menyampaikan rasa terima kasih atas dukungan yang diberikan oleh pihak PT. Humma Teknologi Indonesia. Beliau berharap kerja sama ini dapat menjadi wadah yang efektif untuk melatih kemampuan siswa, baik secara teknis maupun profesional.</p>

                <p>Kerja sama ini juga mencakup pelatihan industri, magang, dan pengembangan kurikulum berbasis kebutuhan dunia kerja. Melalui program ini, siswa diharapkan dapat memahami standar kerja industri sekaligus menyiapkan diri menjadi tenaga profesional yang siap bersaing di era digital.</p>

                <p>Dengan adanya Kelas Industri ini, SMKN 8 Jember menegaskan komitmennya untuk terus berinovasi dalam pendidikan vokasi. Diharapkan, langkah ini menjadi awal yang baik dalam membangun generasi muda yang produktif, kreatif, dan mampu berkontribusi dalam kemajuan teknologi di Indonesia.</p>
                ',
                'status' => 'published',
                'categories' => [0, 12],
                'image' => 'industri.png',
            ],
            [
                'title' => 'Memperingatan Isra’ Mi’raj di SMKN 8 Jember Usung Konsep Baru',
                'content' => '<p>SMKN 8 Jember telah menyelenggarakan kegiatan peringatan Isra’ Mi’raj yang berlangsung selama dua hari dengan konsep yang berbeda dari tahun-tahun sebelumnya. Acara ini diadakan di aula utama sekolah dengan melibatkan seluruh warga sekolah, mulai dari siswa, guru, hingga tenaga kependidikan. Kegiatan tersebut dibuka dengan pembacaan ayat suci Al-Qur’an dan sambutan dari Kepala Sekolah yang menekankan pentingnya memahami makna perjalanan spiritual Nabi Muhammad SAW.</p>

                <p>Tema utama peringatan kali ini adalah <em>“Meningkatkan Kesadaran Spiritual dan Akhlak Mulia di Era Digital”</em>. Melalui tema tersebut, sekolah berupaya menanamkan nilai-nilai keislaman yang relevan dengan tantangan generasi muda masa kini. Sesi ceramah diisi oleh ustaz dari luar sekolah yang memberikan pemahaman mendalam tentang makna Isra’ Mi’raj serta kaitannya dengan kehidupan modern yang penuh dengan kemajuan teknologi.</p>

                <p>Selain kegiatan keagamaan, panitia juga mengadakan lomba-lomba islami seperti kaligrafi, dai muda, dan tilawah antar kelas. Lomba-lomba tersebut disambut antusias oleh para siswa yang ingin menampilkan bakat dan kemampuan mereka dalam bidang keagamaan. Suasana semakin meriah ketika para pemenang diumumkan pada hari kedua, disertai dengan penyerahan hadiah simbolis dari pihak sekolah.</p>

                <p>Menurut salah satu panitia pelaksana, konsep baru tahun ini tidak hanya berfokus pada kegiatan seremonial, tetapi juga menggabungkan unsur edukatif dan interaktif. Melalui kegiatan ini, diharapkan siswa dapat memahami bahwa Isra’ Mi’raj bukan sekadar peristiwa sejarah, melainkan juga sumber inspirasi untuk meningkatkan keimanan dan moralitas dalam kehidupan sehari-hari.</p>

                <p>Pihak sekolah berencana menjadikan kegiatan keagamaan seperti ini sebagai agenda tahunan dengan inovasi berbeda setiap tahunnya. Dengan demikian, SMKN 8 Jember terus berkomitmen membentuk generasi yang tidak hanya unggul dalam akademik dan keterampilan, tetapi juga memiliki karakter spiritual yang kuat dan berakhlak mulia.</p>
                ',
                'status' => 'published',
                'categories' => [13],
                'image' => 'isra.png',
            ],
            [
                'title' => 'Workshop Kesehatan Mental untuk Siswa Kelas X SMKN 8 Jember',
                'content' => '<p>Pada hari Jumat, 7 Februari 2025, Tim Bimbingan Konseling (BK) SMKN 8 Jember menyelenggarakan kegiatan <strong>Workshop Kesehatan Mental</strong> yang diikuti oleh seluruh siswa-siswi kelas X. Acara ini bertujuan untuk meningkatkan kesadaran dan pemahaman peserta didik mengenai pentingnya menjaga serta mengelola kesehatan mental di tengah padatnya aktivitas belajar.</p>

                <p>Kegiatan dilaksanakan di <em>Ruang Praktik Siswa (RPS) Pertanian</em> dan dihadiri oleh sekitar 500 siswa kelas X. Workshop ini menghadirkan narasumber berpengalaman, yaitu <strong>Ibu Andhy Suzana, Amd.Keb., M.Psi., Psi.</strong>, seorang ahli di bidang psikologi yang dikenal aktif dalam edukasi kesehatan mental di kalangan remaja dan pelajar.</p>

                <p>Dalam pemaparannya, Ibu Andhy menjelaskan tentang pentingnya mengenali kondisi mental diri sendiri serta bagaimana menjaga kesehatan pikiran agar tetap seimbang. Beliau juga memberikan contoh nyata mengenai dampak stres dan tekanan akademik terhadap perilaku siswa, serta langkah-langkah sederhana untuk mengatasinya melalui komunikasi dan manajemen emosi yang baik.</p>

                <p>Selain itu, peserta workshop diajak untuk berinteraksi melalui sesi tanya jawab yang membahas pengalaman pribadi terkait tekanan belajar dan hubungan sosial di lingkungan sekolah. Banyak siswa yang merasa terbantu setelah mendapatkan penjelasan dan motivasi dari pemateri.</p>

                <p>Pihak sekolah berharap melalui kegiatan ini, siswa-siswi SMKN 8 Jember dapat lebih terbuka terhadap isu kesehatan mental dan mampu menjaga keseimbangan antara akademik serta kesejahteraan diri. Program serupa direncanakan akan menjadi kegiatan rutin agar kesadaran tentang kesehatan mental terus tumbuh di kalangan pelajar.</p>
',
                'status' => 'published',
                'categories' => [11, 14],
                'image' => 'healt.png',
            ],
            [
                'title' => 'Seleksi Roadshow Jember 2025: SMKN 8 Jember Siap Tampil Beda',
                'content' => '<p>
                    SMKN 8 Jember mengumumkan pelaksanaan <strong>Seleksi Roadshow Wilayah Jember 2025</strong> yang akan digelar pada awal Agustus mendatang.<br>
                    Kegiatan ini bertujuan memfasilitasi siswa berprestasi untuk mempresentasikan karya dan inovasinya di hadapan tim juri regional.<br>
                    Panitia pelaksana menghimbau seluruh sekolah di wilayah Jember untuk mendaftarkan delegasinya sebelum batas waktu pendaftaran.<br>
                    Pendaftaran dapat dilakukan secara online melalui laman resmi sekolah atau membawa berkas pendaftaran ke tata usaha sekolah.
                    </p>

                    <p>
                    Tahapan seleksi meliputi verifikasi administrasi, penilaian karya tertulis, dan presentasi di depan dewan juri yang kompeten di bidangnya.<br>
                    Setiap peserta wajib membawa dokumen pendukung seperti proposal, portofolio, dan bukti pendamping pendamping teknis jika diperlukan.<br>
                    Panitia menegaskan bahwa penilaian akan dilakukan objektif dengan kriteria kreativitas, relevansi, dan kelayakan implementasi.<br>
                    Hasil seleksi tingkat kabupaten akan menjadi dasar untuk menentukan perwakilan pada putaran berikutnya.
                    </p>

                    <p>
                    Bagi pemenang disiapkan penghargaan berupa sertifikat, trofi, dan kesempatan pembinaan lanjutan oleh mitra industri setempat.<br>
                    Sekolah yang berhasil mengirim peserta juga akan mendapat apresiasi dalam bentuk publikasi prestasi pada kanal resmi Dinas Pendidikan.<br>
                    Panitia mengajak guru pembimbing untuk mendampingi peserta selama rangkaian kegiatan demi kelancaran dan keselamatan bersama.<br>
                    Informasi lebih lanjut termasuk jadwal lengkap dan teknis lomba dapat diakses melalui kontak panitia yang tertera di pengumuman resmi.
                    </p>

                    <p>
                    Demi kelancaran acara, pihak sekolah meminta seluruh pihak mematuhi protokol kesehatan dan aturan tata tertib yang berlaku saat kegiatan berlangsung.<br>
                    Peserta diharapkan hadir 30 menit sebelum sesi dimulai dan membawa perlengkapan presentasi yang diperlukan seperti laptop atau hard copy materi.<br>
                    Segala bentuk pertanyaan tentang mekanisme seleksi dapat diajukan melalui email panitia atau langsung ke kantor sekolah pada jam kerja.<br>
                    Semoga kegiatan ini menjadi wadah yang produktif untuk menumbuhkan semangat inovasi dan kolaborasi antar pelajar di Jember.
                    </p>',
                'status' => 'published',
                'categories' => [9],
                'image' => 'roadshow.png',
            ],
            [
                'title' => 'Siswa TKJ Diterima Kerja di PT. Mulia Sawit Agro Lestari Melalui Program Magang Industri',
                'content' => '<p>Prestasi membanggakan kembali diraih oleh salah satu siswa SMKN 8 Jember. Dini Dwi Apriyani, siswi jurusan Teknik Komputer dan Jaringan (TKJ), berhasil diterima bekerja di <strong>PT. Mulia Sawit Agro Lestari</strong> bahkan sebelum resmi dinyatakan lulus sekolah. Keberhasilan ini menjadi bukti nyata bahwa lulusan SMK mampu bersaing di dunia industri secara profesional.</p>

                <p>Menurut pihak sekolah, proses rekrutmen berlangsung secara ketat dan melibatkan serangkaian tes kompetensi serta wawancara langsung dari pihak perusahaan. Dini berhasil menunjukkan kemampuan teknis jaringan komputer dan etika kerja yang tinggi selama proses seleksi, hingga akhirnya terpilih sebagai salah satu kandidat terbaik yang direkrut oleh perusahaan tersebut.</p>

                <p>Kepala Program Keahlian TKJ SMKN 8 Jember, dalam sambutannya, menyampaikan rasa bangga atas pencapaian ini. Ia menuturkan bahwa prestasi Dini menjadi motivasi bagi siswa lain untuk terus meningkatkan keterampilan di bidang teknologi. “Kami berkomitmen untuk terus menyiapkan peserta didik agar siap kerja, berwirausaha, maupun melanjutkan pendidikan,” ujarnya.</p>

                <p>Selain menjadi kebanggaan bagi jurusan TKJ, keberhasilan ini juga memperkuat kerja sama antara SMKN 8 Jember dengan dunia usaha dan industri. Sekolah berharap, pencapaian seperti ini dapat terus berlanjut dan menjadi inspirasi bagi seluruh siswa untuk berani bermimpi besar serta berjuang meraih masa depan yang cerah.</p>
                ',
                'status' => 'published',
                'categories' => [1],
                'image' => 'kerja.png',
            ],
            [
                'title' => 'Siswa TSM Diterima di Yamaha Melalui Program Magang Industri',
                'content' => '<p>
                <strong>Davi Setiawan</strong>, siswa jurusan <em>Teknik Sepeda Motor (TSM)</em> di SMKN 8 Jember, resmi diterima bekerja di <strong>Yamaha Indo Perkasa</strong> sebelum menyelesaikan masa studinya.<br/>
                Proses penerimaan dilakukan setelah Davi mengikuti serangkaian seleksi dan uji keterampilan yang digelar oleh pihak perusahaan bekerja sama dengan sekolah.<br/>
                Penerimaan ini menjadi bukti kualitas pembelajaran praktik di SMKN 8 Jember yang mempersiapkan siswa siap kerja.<br/>
                Pihak sekolah menyampaikan apresiasi dan dukungan penuh agar Davi dapat menjalani tugas barunya dengan baik.
                </p>

                <p>
                Kepala jurusan TSM menyatakan bahwa Davi menunjukkan sikap disiplin dan kemampuan teknis yang menonjol selama praktik kompetensi.<br/>
                Selama magang dan bimbingan, Davi kerap dipercaya mengerjakan servis berat dan perbaikan komponen mesin oleh instruktur praktik.<br/>
                Keberhasilan ini juga mendorong sekolah untuk mempererat kerja sama dengan dunia industri agar peluang serupa terbuka bagi siswa lain.<br/>
                Orang tua Davi turut hadir saat pengumuman resmi dan mengungkapkan kebanggaan atas prestasi anaknya.
                </p>

                <p>
                Manajer rekrutmen Yamaha Indo Perkasa menjelaskan bahwa mereka mencari kandidat yang tidak hanya menguasai teori, tetapi juga memiliki keterampilan praktik nyata.<br/>
                Davi dinilai memenuhi kriteria tersebut sehingga ditawarkan posisi teknisi junior dengan paket pelatihan lanjutan dari perusahaan.<br/>
                Penempatan awal akan diunit servis utama perusahaan dan program orientasi kerja akan berlangsung selama beberapa minggu.<br/>
                Kontrak kerja disesuaikan agar Davi tetap dapat menyelesaikan kewajiban pendidikannya jika diperlukan.
                </p>

                <p>
                Kepala sekolah menyampaikan harapan agar kisah Davi menjadi inspirasi bagi siswa lain untuk memanfaatkan kesempatan praktik dan jejaring industri.<br/>
                Sekolah juga berencana mengadakan lebih banyak program sertifikasi dan kerja sama industri guna meningkatkan daya saing lulusan.<br/>
                Untuk ke depannya, pihak sekolah dan industri sepakat menyusun jalur magang yang lebih sistematis bagi calon lulusan.<br/>
                Semoga keberhasilan Davi mendorong semangat belajar dan kesiapan kerja generasi penerus SMKN 8 Jember.
                </p>
',
                'status' => 'published',
                'categories' => [3],
                'image' => 'kerjaYamaha.png',
            ],
            [
                'title' => 'Tim Media DKV SMKN 8 Jember Raih Juara 3 Lomba Video Branding',
                'content' => '<p>
                Selamat dan sukses kami ucapkan kepada <strong>Tim Media DKV SMKN 8 Jember</strong> yang telah berhasil
                mengharumkan nama sekolah dalam ajang <em>Lomba Video Branding Showroom</em> yang diselenggarakan oleh
                <strong>@rizkimobiljember</strong>. Tim kreatif ini berhasil meraih <strong>Juara 3</strong> setelah
                bersaing ketat dengan berbagai sekolah lain di wilayah Jember dan sekitarnya.
            </p>

            <p>
                Tim ini terdiri dari siswa-siswi berbakat dari jurusan <strong>Desain Komunikasi Visual (DKV)</strong>, yaitu:
                Ricky Dwi Abdul Aziz (XI DKV 2), Rasya Satya Altara (XI DKV 2),
                Salma Dwi Arianti (XI DKV 2), Dafinza Maulana Bagus Putra (XI DKV 1), dan Bayu Firmansyah (XI DKV 1).
                Mereka menampilkan karya video yang menggabungkan elemen visual kreatif, storytelling yang kuat,
                serta editing yang profesional.
            </p>

            <p>
                Kepala SMKN 8 Jember menyampaikan rasa bangga dan apresiasi yang tinggi atas capaian tersebut.
                Beliau menegaskan bahwa prestasi ini tidak hanya menjadi kebanggaan sekolah,
                tetapi juga menjadi bukti nyata kemampuan siswa-siswi SMKN 8 Jember dalam berinovasi di bidang
                teknologi dan media kreatif.
            </p>

            <p>
                Melalui lomba ini, diharapkan para siswa semakin termotivasi untuk terus mengasah kemampuan
                dan meningkatkan kompetensi di bidang desain serta multimedia. SMKN 8 Jember akan terus mendukung
                kegiatan positif seperti ini agar semakin banyak siswa yang berprestasi di tingkat daerah maupun nasional.
            </p>

            <p>
                Sekali lagi, selamat kepada seluruh anggota tim atas keberhasilannya!
                Semoga prestasi ini menjadi langkah awal menuju pencapaian yang lebih tinggi di masa depan.
            </p>

            ',
                'status' => 'published',
                'categories' => [2, 7],
                'image' => 'video.png',
            ],
        ];

        // Insert artikel
        foreach ($articles as $index => $articleData) {
            $title = $articleData['title'];
            $slug = Str::slug($title);

            // Pastikan slug unique
            $originalSlug = $slug;
            $counter = 1;
            while (Article::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $article = Article::create([
                'title' => $title,
                'slug' => $slug,
                'content' => $articleData['content'],
                'status' => $articleData['status'],
                'image' => $articleData['image'] ?? 'articles/default-article-' . ($index + 1) . '.jpg',
                'author_id' => $author->id,
                'views' => rand(10, 500),
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now(),
            ]);

            // Attach categories
            $categoryIds = [];
            foreach ($articleData['categories'] as $catIndex) {
                if (isset($categories[$catIndex])) {
                    $categoryIds[] = $categories[$catIndex]->id;
                }
            }

            if (!empty($categoryIds)) {
                $article->categories()->attach($categoryIds);
            }

            echo "Created article: {$title}\n";
        }

        echo "\nArticle seeder completed successfully!\n";
        echo "Total articles created: " . count($articles) . "\n";
        echo "Published: " . collect($articles)->where('status', 'published')->count() . "\n";
        echo "Draft: " . collect($articles)->where('status', 'draft')->count() . "\n";
    }
}
