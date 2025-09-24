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

    public function index() {
        $data = Extracurricular::all();
        return $this->success($data, 'Extracurriculars retrieved successfully');
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

        if ($extracurricular->image) {
            Storage::disk('public')->delete($extracurricular->image);
        }
        $extracurricular->delete();

        return $this->deleted('Extracurricular deleted successfully');
    }
}
