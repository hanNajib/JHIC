<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Models\Major;
use Illuminate\Support\Facades\Storage;

class MajorsController extends Controller
{
    use ApiResponse;
    public function index(Request $request)
    {
        $major = Major::applyFilters(
            $request,
            ['name', 'description'],
            []
        );
        return $this->cursorPaginated($major, 'Majors retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:majors,name',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $createData = $request->only(['name', 'description']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('majors', 'public');
            $createData['image'] = $imagePath;
        }

        $major = Major::create($createData);

        return $this->created($major, 'Major created successfully');
    }

    public function show($id)
    {
        $major = Major::find($id);
        if (!$major) {
            return $this->notFound('Major not found');
        }
        return $this->success($major, 'Major retrieved successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string|unique:majors,name,' . $id,
            'description' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $major = Major::find($id);
        if (!$major) {
            return $this->notFound('Major not found');
        }
        
        $updateData = $request->only(['name', 'description']);
        
        if ($request->hasFile('image')) {
            if ($major->OriginalImagePath()) {
                Storage::disk('public')->delete($major->OriginalImagePath());
            }
            
            $imagePath = $request->file('image')->store('majors', 'public');
            $updateData['image'] = $imagePath;
        }
        
        $major->update($updateData);

        return $this->updated($major, 'Major updated successfully');
    }

    public function delete($id)
    {
        $major = Major::find($id);
        if (!$major) {
            return $this->notFound('Major not found');
        }

        if ($major->image) {
            Storage::disk('public')->delete($major->image);
        }
        $major->delete();
        return $this->deleted('Major deleted successfully');
    }

    public function restore($id) {
        $major = Major::withTrashed()->find($id);
        if (!$major) {
            return $this->notFound('Major not found');
        }
        if (!$major->trashed()) {
            return $this->badRequest('Major is not deleted');
        }
        $major->restore();
        return $this->success($major, 'Major restored successfully');
    }
}
