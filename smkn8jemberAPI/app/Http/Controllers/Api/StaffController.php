<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
    /**
     * List semua staff dengan filter & pagination
     */
    public function index(Request $request)
    {
        $staff = Staff::applyFilters(
            $request,
            searchable: ['name', 'role', 'position', 'subjects'],
            filters: ['role', 'category'],
            relationFilters: []
        );

        return $this->cursorPaginated($staff, 'Staff retrieved successfully');
    }

    /**
     * Struktur organisasi (untuk tampilan front-end)
     */
    public function structure()
    {
        $kepalaSekolah = Staff::where('role', 'principal')->first();

        $waka = Staff::where('category', 'waka')->get();

        $koordinator = Staff::where('category', 'koordinator')->get();

        $koordinatorJurusan = Staff::where('category', 'koordinator_jurusan')->get();

        $jumlah = [
            'guru' => Staff::where('role', 'teacher')->count(),
            'staff' => Staff::where('role', 'employee')->count(),
            'teknisi' => Staff::where('position', 'like', '%Teknisi%')->count(),
            'satpam' => Staff::where('position', 'like', '%Satpam%')->count(),
        ];

        return $this->success([
            'kepala_sekolah' => $kepalaSekolah,
            'wakil_kepala' => $waka,
            'koordinator' => $koordinator,
            'koordinator_jurusan' => $koordinatorJurusan,
            'jumlah_tenaga_kerja' => $jumlah,
        ], 'Staff structure retrieved successfully');
    }

    /**
     * Detail staff by ID
     */
    public function show($id)
    {
        $staff = Staff::find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }
        return $this->success($staff);
    }

    /**
     * Tambah staff baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
            'subjects' => 'nullable|string|max:255',
        ]);

        $createData = $request->only(['name', 'role', 'position', 'subjects']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('staff', 'public');
            $createData['image'] = $imagePath;
        }

        $staff = Staff::create($createData);
        return $this->created($staff, 'Staff created successfully');
    }

    /**
     * Update data staff
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'position' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
            'subjects' => 'sometimes|nullable|string|max:255',
        ]);

        $staff = Staff::find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }

        $updateData = $request->only(['name', 'role', 'position', 'subjects']);

        if ($request->hasFile('image')) {
            if ($staff->image) {
                Storage::disk('public')->delete($staff->image);
            }
            $imagePath = $request->file('image')->store('staff', 'public');
            $updateData['image'] = $imagePath;
        }

        $staff->update($updateData);
        return $this->success($staff, 'Staff updated successfully');
    }

    /**
     * Hapus staff (soft delete)
     */
    public function delete($id)
    {
        $staff = Staff::find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }

        $staff->delete();
        return $this->success(null, 'Staff deleted successfully');
    }

    /**
     * Restore staff yang dihapus
     */
    public function restore($id)
    {
        $staff = Staff::withTrashed()->find($id);
        if (!$staff) {
            return $this->notFound("Staff not found");
        }
        $staff->restore();
        return $this->statusMessage("Staff restored successfully");
    }

    public function forceDelete($id)
    {
        $staff = Staff::withTrashed()->find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }

        if ($staff->image) {
            Storage::disk('public')->delete($staff->image);
        }
        $staff->forceDelete();
        return $this->deleted('Staff permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Staff::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted staff found with the provided IDs');
        }

        return $this->statusMessage($restored . ' staff member(s) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $staffMembers = Staff::withTrashed()->whereIn('id', $ids)->get();
        
        if ($staffMembers->isEmpty()) {
            return $this->notFound('No staff found with the provided IDs');
        }

        foreach ($staffMembers as $staff) {
            if ($staff->image) {
                Storage::disk('public')->delete($staff->image);
            }
            $staff->forceDelete();
        }

        return $this->deleted(count($staffMembers) . ' staff member(s) permanently deleted');
    }
}
