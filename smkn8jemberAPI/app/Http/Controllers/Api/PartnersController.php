<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use PhpParser\Builder\Param;

class PartnersController extends Controller
{
    public function index()
    {
        $partner = Partner::all();
        return response()->json([
            'data' => $partner
        ], 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:partners,name',
            'iamge' => 'required|string|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'major_id' => 'required|exists:majors,id',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('partners', 'public');
        }

        $partner = Partner::create($request->all());
        $partner->image = $path ?? null;
        $partner->save();

        return response()->json([
            'message' => 'Partner created successfully',
            'data' => $partner
        ], 201);
    }

    public function show($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json([
                'message' => 'Partner Not Found'
            ], 404);
        }
        return response()->json([
            'data' => $partner
        ], 201);
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
            return response()->json([
                'message' => 'Partner Not Found'
            ], 404);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('partners', 'public');
            $partner->image = $path;
        }
        $partner->update($request->all());
        return response()->json([
            'message' => 'Partner Updated Successfully',
            'data' => $partner
        ], 201);
    }

    public function delete($id){
        $partner = Partner::find($id);
        if(!$partner){
            return response()->json([
                'message' => 'Partner Not Found'
            ], 404);
        }
        $partner->delete();

        return response()->json([
            'message' => 'Partner Deleted Successfully'
        ], 201);

    }
}
