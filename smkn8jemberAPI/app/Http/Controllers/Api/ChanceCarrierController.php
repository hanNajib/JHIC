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
        $data = ChanceCarrier::with('major')->applyFilters(
            request(),
            searchable: ['name', 'salary'],
            filters: ['major_id'],
            relationFilters: ['major.name' => 'major_name']
        );
        return $this->cursorPaginated($data, 'Chance carriers retrieved successfully');

    }

    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'salary' => 'required|string',
            'icon' => 'required|string',
            'major_id' => 'required|exists:majors,id',
        ]);

        $createData = $request->only(['name', 'salary', 'major_id', 'icon']);

        if($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('chancecarrier', 'public');
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
            'salary' => 'sometimes|required|string',
            'icon' => 'sometimes|required|string',
            'major_id' => 'sometimes|exists:majors,id',
        ]);

        $chanceCarrier = ChanceCarrier::find($id);
        if (!$chanceCarrier) {
            return $this->notFound('Chance carrier not found');
        }

        $updateData = $request->only(['name', 'description', 'major_id', 'icon']);

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

    public function forceDelete($id)
    {
        $chanceCarrier = ChanceCarrier::withTrashed()->find($id);
        if (!$chanceCarrier) {
            return $this->notFound('Chance carrier not found');
        }

        if ($chanceCarrier->image) {
            Storage::disk('public')->delete($chanceCarrier->image);
        }
        $chanceCarrier->forceDelete();
        return $this->deleted('Chance carrier permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = ChanceCarrier::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted chance carriers found with the provided IDs');
        }

        return $this->statusMessage($restored . ' chance carrier(s) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $carriers = ChanceCarrier::withTrashed()->whereIn('id', $ids)->get();
        
        if ($carriers->isEmpty()) {
            return $this->notFound('No chance carriers found with the provided IDs');
        }

        foreach ($carriers as $carrier) {
            if ($carrier->image) {
                Storage::disk('public')->delete($carrier->image);
            }
            $carrier->forceDelete();
        }

        return $this->deleted(count($carriers) . ' chance carrier(s) permanently deleted');
    }
}
