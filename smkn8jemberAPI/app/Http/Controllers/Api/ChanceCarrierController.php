<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChanceCarrier;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChanceCarrierController extends Controller
{
    use ApiResponse;

    public function index() {
        $data = ChanceCarrier::all();
        return $this->success($data, 'Chance carriers retrieved successfully');

    }

    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'major_id' => 'required|exists:majors,id',
        ]);

        $createData = $request->only(['name', 'description', 'major_id']);

        if($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('extracurriculars', 'public');
            $createData['image'] = $imagePath;
        }

        $chanceCarrier = ChanceCarrier::create($createData);
        return $this->created($chanceCarrier, 'Chance carrier created successfully');
    }


    public function show($id)
    {
        $chanceCarrier = ChanceCarrier::find($id);
        if (!$chanceCarrier) {
            return $this->notFound('Chance carrier not found');
        }
        return $this->success($chanceCarrier);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'sometimes|required|string',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $chanceCarrier = ChanceCarrier::find($id);
        if (!$chanceCarrier) {
            return $this->notFound('Chance carrier not found');
        }

        $updateData = $request->only(['name', 'description', 'major_id']);

        if ($request->hasFile('image')) {
            if ($chanceCarrier->OriginalImagePath()) {
                Storage::disk('public')->delete($chanceCarrier->OriginalImagePath());
            }

            $imagePath = $request->file('image')->store('chance-carriers', 'public');
            $updateData['image'] = $imagePath;
        }

        $chanceCarrier->update($updateData);
        return $this->updated($chanceCarrier, 'Chance carrier updated successfully');
    }

    public function delete($id)
    {
        $chanceCarrier = ChanceCarrier::find($id);

        if (!$chanceCarrier) {
            return $this->notFound('Chance carrier not found');
        }

        if ($chanceCarrier->image) {
            Storage::disk('public')->delete($chanceCarrier->image);
        }
        $chanceCarrier->delete();

        return $this->deleted('Chance carrier deleted successfully');
    }

    public function restore($id){
        $chanceCarrier = ChanceCarrier::withTrashed()->find($id);
        if (!$chanceCarrier) {
            return $this->notFound("Chance carrier not found");
        }
        $chanceCarrier->restore();
        return $this->statusMessage("Chance carrier restored successfully");
    }
}
