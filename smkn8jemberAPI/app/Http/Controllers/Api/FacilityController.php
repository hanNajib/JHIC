<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FacilityController extends Controller
{
    use ApiResponse;
    public function index(Request $request)
    {
         $facility = Facility::applyFilters(
            $request,
            ['name', 'description', 'room_total'],
            []
        );
        return $this->cursorPaginated($facility, 'Facility retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'room_total' => 'required|integer',
        ]);

        $createData = $request->only(['name', 'description', 'room_total']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('facilities', 'public');
            $createData['image'] = $imagePath;
        }

        $facility = Facility::create($createData);

        return $this->created($facility, 'Facility created successfully');
    }

    public function show($id)
    {
        $facility = Facility::find($id);
        if (!$facility) {
            return $this->notFound('Facility not found');
        }

        return $this->success($facility, 'Facility retrieved successfully');
    }

    public function update(Request $request, $id)
    {
        $facility = Facility::find($id);

        if (!$facility) {
            return $this->notFound('Facility not found');
        }

        $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'room_total' => 'sometimes|integer'
        ]);

        $updateData = $request->only(['name', 'description', 'room_total']);

        if ($request->hasFile('image')) {
            if ($facility->OriginalImagePath()) {
                Storage::disk('public')->delete($facility->OriginalImagePath());
            }

            $imagePath = $request->file('image')->store('facilities', 'public');
            $updateData['image'] = $imagePath;
        }

        $facility->update($updateData);

        return $this->updated($facility, 'Facility updated successfully');
    }

    public function delete($id)
    {
        $facility = Facility::find($id);
        if (!$facility) {
            return $this->notFound('Facility not found');
        }

        if($facility->image){
            Storage::disk('public')->delete($facility->image);
        }

        $facility->delete();
        return $this->deleted('Facility deleted successfully');
    }

    public function restore($id){
        $facility = Facility::withTrashed()->find($id);
        if (!$facility) {
            return $this->notFound("Facility not found");
        }
        $facility->restore();
        return $this->statusMessage("Facility restored successfully");
    }
}
