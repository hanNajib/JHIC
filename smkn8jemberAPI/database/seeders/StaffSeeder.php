<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        // =====================
        // 1️⃣ KEPALA SEKOLAH
        // =====================
        $kepala = Staff::create([
            'name' => 'Hj. Rahmah Hidana, S.Pd., M.Si.',
            'role' => 'employee',
            'position' => 'Kepala Sekolah',
            'category' => 'kepala_sekolah',
            'image' => null,
            'subjects' => null,
            'parent_id' => null,
        ]);

        // =====================
        // 2️⃣ TIM PENGEMBANG SEKOLAH
        // =====================
        $pengembang = collect([
            ['name' => 'Rahman Taufik, S.Pd'],
            ['name' => 'Winarti, S.Pd'],
        ])->map(fn ($item) => Staff::create(array_merge($item, [
            'role' => 'employee',
            'position' => 'Tim Pengembang Sekolah',
            'category' => 'lainnya',
            'parent_id' => $kepala->id,
        ])));

        // =====================
        // 3️⃣ WAKA & KEPALA TU
        // =====================
        $waka = [
            ['name' => 'Sugianto, S.Pd', 'position' => 'Kepala Tata Usaha', 'category' => 'lainnya'],
            ['name' => 'Khairul Anwar, S.Pd', 'position' => 'Waka Kesiswaan', 'category' => 'waka'],
            ['name' => 'Putri Maulidya, S.P', 'position' => 'Waka Kurikulum', 'category' => 'waka'],
            ['name' => 'Sunarti, S.Pd', 'position' => 'Waka Sarpras', 'category' => 'waka'],
            ['name' => 'Sutopo, S.Sos., S.Kom', 'position' => 'Waka Humas', 'category' => 'waka'],
        ];

        $wakaRecords = collect($waka)->map(fn ($item) => Staff::create(array_merge($item, [
            'role' => 'employee',
            'image' => null,
            'subjects' => null,
            'parent_id' => $kepala->id,
        ])))->keyBy('position');

        // =====================
        // 4️⃣ KOORDINATOR & STAFF TU
        // =====================
        $kesiswaan = $wakaRecords['Waka Kesiswaan'] ?? null;
        $kurikulum = $wakaRecords['Waka Kurikulum'] ?? null;
        $sarpras = $wakaRecords['Waka Sarpras'] ?? null;
        $humas = $wakaRecords['Waka Humas'] ?? null;

        // TU
        Staff::insert([
            ['name' => 'Imam Khoiri, S.Pd.I', 'position' => 'Bendahara BOS', 'category' => 'lainnya', 'parent_id' => $wakaRecords['Kepala Tata Usaha']->id],
            ['name' => 'Putri Isti Arifah, S.Pd', 'position' => 'Bendahara BPOPP', 'category' => 'lainnya', 'parent_id' => $wakaRecords['Kepala Tata Usaha']->id],
            ['name' => 'Lailly Madiatur, S.Pd', 'position' => 'Koord. PIP', 'category' => 'koordinator', 'parent_id' => $wakaRecords['Kepala Tata Usaha']->id],
            ['name' => 'Nurulh Yunianswati, S.Pd', 'position' => 'Koord. PIP', 'category' => 'koordinator', 'parent_id' => $wakaRecords['Kepala Tata Usaha']->id],
        ]);

        // Kesiswaan
        Staff::insert([
            ['name' => 'Dyasih Wulandari, S.Pd', 'position' => 'Koord. BK', 'category' => 'koordinator', 'parent_id' => $kesiswaan->id],
            ['name' => 'A.W Hendro Puguh, S.Sn', 'position' => 'Koord. Kedisiplinan', 'category' => 'koordinator', 'parent_id' => $kesiswaan->id],
            ['name' => 'Azwino Wanda WK, S.T', 'position' => 'Pembina OSIS', 'category' => 'koordinator', 'parent_id' => $kesiswaan->id],
            ['name' => 'Dian Wardani, S.Pd', 'position' => 'Koord. Ekstrakurikuler', 'category' => 'koordinator', 'parent_id' => $kesiswaan->id],
            ['name' => 'Rohman Alam, S.Pd', 'position' => 'Koord. KOPSIS', 'category' => 'koordinator', 'parent_id' => $kesiswaan->id],
        ]);

        // Kurikulum
        Staff::insert([
            ['name' => 'Ayu Hasin, S.Pd', 'position' => 'Koord. PSDM', 'category' => 'koordinator', 'parent_id' => $kurikulum->id],
            ['name' => 'Dedi Kurniawan, S.Pd', 'position' => 'Koord. PBM', 'category' => 'koordinator', 'parent_id' => $kurikulum->id],
            ['name' => 'Mar’ifatatus Zuhlia, S.Pd', 'position' => 'Koord. Evaluasi KBM', 'category' => 'koordinator', 'parent_id' => $kurikulum->id],
        ]);

        // Sarpras
        Staff::insert([
            ['name' => 'Nasiruddin, S.T., Gr', 'position' => 'Koord. Pengadaan', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
            ['name' => 'Andi Hermanto, S.T.', 'position' => 'Koord. Pemeliharaan', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
            ['name' => 'Setyo Puji KW, S.Kom', 'position' => 'Pengembang IT', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
            ['name' => 'Abdul Manan, S.Pd', 'position' => 'Koord. Perpustakaan', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
            ['name' => 'Aris Eko Purwanto, S.T', 'position' => 'Koord. Lab/Bengkel', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
            ['name' => 'Hana Partini, S.Pd', 'position' => 'Koord. Kebersihan & Lingkungan', 'category' => 'koordinator', 'parent_id' => $sarpras->id],
        ]);

        // Humas
        Staff::insert([
            ['name' => 'Tatik Maryati, S.Pd', 'position' => 'Koord. Sosial', 'category' => 'koordinator', 'parent_id' => $humas->id],
            ['name' => 'M. Fatah Yasin, S.T', 'position' => 'BKK', 'category' => 'koordinator', 'parent_id' => $humas->id],
            ['name' => 'Ratri Rahmawati, S.Pd', 'position' => 'Koord. PKL', 'category' => 'koordinator', 'parent_id' => $humas->id],
            ['name' => 'M. Zainuri, S.Pd', 'position' => 'Koord. Media Promosi', 'category' => 'koordinator', 'parent_id' => $humas->id],
            ['name' => 'Yunus Ristan H, S.Pd', 'position' => 'Koord. LKS', 'category' => 'koordinator', 'parent_id' => $humas->id],
            ['name' => 'Ulffah Dewiyanti, S.Pd', 'position' => 'Koord. UP', 'category' => 'koordinator', 'parent_id' => $humas->id],
        ]);

        // =====================
        // 5️⃣ KAPROGLI
        // =====================
        $kaprogli = [
            ['name' => 'Dwi Sugeng Wahono, S.T', 'position' => 'Kaprogli T. Otomotif'],
            ['name' => 'Tri Sukhiani, S.Pd., Gr.', 'position' => 'Wakaprogli T. Otomotif'],
            ['name' => 'Sulistyani Purnukas Jati, S.Kom', 'position' => 'Kaprogli TKJ'],
            ['name' => 'Kuliah Surprapto, S.Kom', 'position' => 'Kaprogli RPL'],
            ['name' => 'Fikri Hilman, S.Kom', 'position' => 'Kaprogli DKV'],
            ['name' => 'Desi Triyoga Ratri, S.P', 'position' => 'Kaprogli Agribisnis Tanaman'],
            ['name' => 'Amik Purwaningsih, S.P', 'position' => 'Wakaprogli Agribisnis Tanaman'],
        ];

        foreach ($kaprogli as $item) {
            Staff::create(array_merge($item, [
                'role' => 'employee',
                'category' => 'koordinator_jurusan',
                'image' => null,
                'subjects' => null,
                'parent_id' => $kurikulum->id, // Kaprogli di bawah kurikulum
            ]));
        }
    }
}
