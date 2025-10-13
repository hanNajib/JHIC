<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
     public function index(Request $request)
    {
        $staff = Staff::applyFilters(
            $request,
            ['name', 'role', 'position', 'subjects'],
            []
        );
        return $this->cursorPaginated($staff, 'Staff retrieved successfully');
    }

    public function show($id)
    {
        $staff = Staff::find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }
        return $this->success($staff);
    }

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
            // Delete old image if exists
            if ($staff->image) {
                Storage::disk('public')->delete($staff->image);
            }
            $imagePath = $request->file('image')->store('staff', 'public');
            $updateData['image'] = $imagePath;
        }

        $staff->update($updateData);
        return $this->success($staff, 'Staff updated successfully');
    }


    public function delete($id)
    {
        $staff = Staff::find($id);
        if (!$staff) {
            return $this->notFound('Staff not found');
        }

        // Delete image if exists
        if ($staff->image) {
            Storage::disk('public')->delete($staff->image);
        }

        $staff->delete();
        return $this->success(null, 'Staff deleted successfully');
    }

    public function restore($id)
    {
        $staff = Staff::withTrashed()->find($id);
        if (!$staff) {
            return $this->notFound("Staff not found");
        }
        $staff->restore();
        return $this->statusMessage("Staff restored successfully");
    }
}
