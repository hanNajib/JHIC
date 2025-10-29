<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        $getRole = fn(string $category) => match ($category) {
            'kepala_sekolah' => 'principal',
            'waka', 'koordinator', 'koordinator_jurusan' => 'teacher',
            default => 'employee',
        };

        // 1️⃣ Kepala Sekolah
        $kepala = Staff::create([
            'name' => 'Hj. Rahmah Hidana, S.Pd., M.Si.',
            'role' => $getRole('kepala_sekolah'),
            'position' => 'Kepala Sekolah',
            'category' => 'kepala_sekolah',
            'image' => null,
            'subjects' => null,
            'parent_id' => null,
        ]);

        // 2️⃣ Tim Pengembang Sekolah
        collect([
            ['name' => 'Rahman Taufik, S.Pd'],
            ['name' => 'Winarti, S.Pd'],
        ])->each(fn($item) =>
            Staff::create(array_merge($item, [
                'role' => $getRole('lainnya'),
                'position' => 'Tim Pengembang Sekolah',
                'category' => 'lainnya',
                'parent_id' => $kepala->id,
            ]))
        );

        // 3️⃣ Waka & Kepala TU
        $waka = [
            ['name' => 'Sugianto, S.Pd', 'position' => 'Kepala Tata Usaha', 'category' => 'lainnya'],
            ['name' => 'Khoirul Anwar, S.Pd', 'position' => 'Waka Kesiswaan', 'category' => 'waka'],
            ['name' => 'Putri Maulidya Firmasari, S.P', 'position' => 'Waka Kurikulum', 'category' => 'waka'],
            ['name' => 'Sunarti, S.Pd', 'position' => 'Waka Sarpras', 'category' => 'waka'],
            ['name' => 'Sutopo, S.Sos., S.Kom', 'position' => 'Waka Humas', 'category' => 'waka'],
        ];

        $wakaRecords = collect($waka)->map(fn($item) =>
            Staff::create(array_merge($item, [
                'role' => $getRole($item['category']),
                'image' => null,
                'subjects' => null,
                'parent_id' => $kepala->id,
            ]))
        )->keyBy('position');

        // ambil parent
        $tu = $wakaRecords['Kepala Tata Usaha'];
        $kesiswaan = $wakaRecords['Waka Kesiswaan'];
        $kurikulum = $wakaRecords['Waka Kurikulum'];
        $sarpras = $wakaRecords['Waka Sarpras'];
        $humas = $wakaRecords['Waka Humas'];

        // 4️⃣ Koordinator dan Staff TU
        $now = now();
        Staff::insert([
            // TU
            ['name' => 'Imam Khoiri, S.Pd.I', 'role' => $getRole('lainnya'), 'position' => 'Bendahara BOS', 'category' => 'lainnya', 'image' => null, 'subjects' => null, 'parent_id' => $tu->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Putri Isti Arifah, S.Pd', 'role' => $getRole('lainnya'), 'position' => 'Bendahara BPOPP', 'category' => 'lainnya', 'image' => null, 'subjects' => null, 'parent_id' => $tu->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Laily Mazidatur Rohmah, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. PIP', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $tu->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Nur Afni Yunisnawati, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. PIP', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $tu->id, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Kesiswaan
        Staff::insert([
            ['name' => 'Dyasih Wulandari, S.Psi', 'role' => $getRole('koordinator'), 'position' => 'Koord. BK', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kesiswaan->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'A.W Hendro Puguh, S.Sn', 'role' => $getRole('koordinator'), 'position' => 'Koord. Kedisiplinan', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kesiswaan->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Azwino Wanda WK, S.T', 'role' => $getRole('koordinator'), 'position' => 'Pembina OSIS', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kesiswaan->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Dian Wardani, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. Ekstrakurikuler', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kesiswaan->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Rohman Alam I, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. KOPSIS', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kesiswaan->id, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Kurikulum
        Staff::insert([
            ['name' => 'Ayu Hasin, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. PSDM', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kurikulum->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Dedi Kurniawan, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. PBM', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kurikulum->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Ma'rifatus Zuhlia, S.Pd", 'role' => $getRole('koordinator'), 'position' => 'Koord. Evaluasi KBM', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $kurikulum->id, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Sarpras
        Staff::insert([
            ['name' => 'Nasiruddin, S.T., Gr', 'role' => $getRole('koordinator'), 'position' => 'Koord. Pengadaan', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Andi Hermanto, S.ST.', 'role' => $getRole('koordinator'), 'position' => 'Koord. Pemeliharaan', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Setyo Puji KW, S.Kom', 'role' => $getRole('koordinator'), 'position' => 'Pengembang IT', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Abdul Manan, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. Perpustakaan', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Aris Eko Purwanto, S.T', 'role' => $getRole('koordinator'), 'position' => 'Koord. Lab/Bengkel', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Hana Partini, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. Kebersihan & Lingkungan', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $sarpras->id, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Humas
        Staff::insert([
            ['name' => 'Tatik Maryati, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. Sosial', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'M. Fatah Yasin, S.T', 'role' => $getRole('koordinator'), 'position' => 'BKK', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ratri Rahmawati, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. PKL', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'M. Zainuri, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. Media Promosi', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Yunus Ristan H, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. LKS', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ulffah Dewiyanti, S.Pd', 'role' => $getRole('koordinator'), 'position' => 'Koord. UP', 'category' => 'koordinator', 'image' => null, 'subjects' => null, 'parent_id' => $humas->id, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // 5️⃣ Kaprogli
        $kaprogli = [
            ['name' => 'Dwi Sugeng Wahono, S.T', 'position' => 'Kaprogli T. Otomotif'],
            ['name' => 'Tri Sulkhani, S.Pd., Gr.', 'position' => 'Wakaprogli T. Otomotif'],
            ['name' => 'Sulistiyani Pamungkas Jati, S.Kom', 'position' => 'Kaprogli TKJ'],
            ['name' => 'Kukuh Surprapto, S.Kom', 'position' => 'Kaprogli RPL'],
            ['name' => 'Fikri Hilman, S.Kom', 'position' => 'Kaprogli DKV'],
            ['name' => 'Desi Triyoga Ratri, S.P', 'position' => 'Kaprogli Agribisnis Tanaman'],
            ['name' => 'Anik Purwaningsih, S.P', 'position' => 'Wakaprogli Agribisnis Tanaman'],
        ];

        foreach ($kaprogli as $item) {
            Staff::create(array_merge($item, [
                'role' => $getRole('koordinator_jurusan'),
                'category' => 'koordinator_jurusan',
                'image' => null,
                'subjects' => null,
                'parent_id' => $kurikulum->id,
            ]));
        }
    }
}
