<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnersController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $partner = Partner::all();
        return $this->success($partner, 'Partners retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:partners,name',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'major_id' => 'required|exists:majors,id',
        ]);

        $createData = $request->only(['name', 'major_id']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('partners', 'public');
            $createData['image'] = $imagePath;
        }

        $partner = Partner::create($createData);

        return $this->created($partner, 'Partner created successfully');
    }

    public function show($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return $this->notFound('Partner not found');
        }
        return $this->success($partner, 'Partner retrieved successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string|unique:partners,name,' . $id,
            'image' => 'sometimes|image|mimes:jpeg,png,gif,svg|max:2048',
            'major_id' => 'sometimes|exists:majors,id',
        ]);

        $partner = Partner::find($id);
        if (!$partner) {
            return $this->notFound('Partner not found');
        }

        $updateData = $request->only(['name', 'major_id']); 

        if ($request->hasFile('image')) {
            if ($partner->OriginalImagePath()) {
                Storage::disk('public')->delete($partner->OriginalImagePath());
            }
            
            $imagePath = $request->file('image')->store('partners', 'public');
            $updateData['image'] = $imagePath;
        }
        
        $partner->update($updateData);
        return $this->updated($partner, 'Partner updated successfully');
    }

    public function delete($id){
        $partner = Partner::find($id);
        if(!$partner){
            return $this->notFound('Partner not found');
        }

        if ($partner->image) {
            Storage::disk('public')->delete($partner->image);
        }
        
        $partner->delete();

        return $this->deleted('Partner deleted successfully');
    }
}
