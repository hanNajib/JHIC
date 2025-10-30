<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExtracurricularController extends Controller
{
    use ApiResponse;

    public function index(Request $request) {
      $extracurricular = Extracurricular::applyFilters(
            $request,
            ['name', 'mentor_name', 'description'],
            []
        );
        return $this->cursorPaginated($extracurricular, 'Extarculicular retrieved successfully');
    }

    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'mentor_name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $createData = $request->only(['name', 'mentor_name', 'description']);

        if($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('extracurriculars', 'public');
            $createData['image'] = $imagePath;
        }

        $extracurricular = Extracurricular::create($createData);
        return $this->created($extracurricular, 'Extracurricular created successfully');
    }


    public function show($id)
    {
        $extracurricular = Extracurricular::find($id);
        if (!$extracurricular) {
            return $this->notFound('Extracurricular not found');
        }
        return $this->success($extracurricular);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'sometimes|required|string',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $extracurricular = Extracurricular::find($id);
        if (!$extracurricular) {
            return $this->notFound('Extracurricular not found');
        }

        $updateData = $request->only(['name', 'mentor_name', 'description']);

        if ($request->hasFile('image')) {
            if ($extracurricular->OriginalImagePath()) {
                Storage::disk('public')->delete($extracurricular->OriginalImagePath());
            }

            $imagePath = $request->file('image')->store('extracurriculars', 'public');
            $updateData['image'] = $imagePath;
        }

        $extracurricular->update($updateData);
        return $this->updated($extracurricular, 'Extracurricular updated successfully');
    }

    public function delete($id)
    {
        $extracurricular = Extracurricular::find($id);

        if (!$extracurricular) {
            return $this->notFound('Extracurricular not found');
        }

        $extracurricular->delete();

        return $this->deleted('Extracurricular deleted successfully');
    }

    public function restore($id){
        $extracurricular = Extracurricular::withTrashed()->find($id);
        if (!$extracurricular) {
            return $this->notFound("Extracurricular not found");
        }
        $extracurricular->restore();
        return $this->statusMessage("Extracurricular restored successfully");
    }

    public function forceDelete($id)
    {
        $extracurricular = Extracurricular::withTrashed()->find($id);
        if (!$extracurricular) {
            return $this->notFound('Extracurricular not found');
        }

        if ($extracurricular->image) {
            Storage::disk('public')->delete($extracurricular->originalImagePath());
        }
        $extracurricular->forceDelete();
        return $this->deleted('Extracurricular permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Extracurricular::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted extracurriculars found with the provided IDs');
        }

        return $this->statusMessage($restored . ' extracurricular(s) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $extracurriculars = Extracurricular::withTrashed()->whereIn('id', $ids)->get();
        
        if ($extracurriculars->isEmpty()) {
            return $this->notFound('No extracurriculars found with the provided IDs');
        }

        foreach ($extracurriculars as $extracurricular) {
            if ($extracurricular->image) {
                Storage::disk('public')->delete($extracurricular->originalImagePath());
            }
            $extracurricular->forceDelete();
        }

        return $this->deleted(count($extracurriculars) . ' extracurricular(s) permanently deleted');
    }
}
