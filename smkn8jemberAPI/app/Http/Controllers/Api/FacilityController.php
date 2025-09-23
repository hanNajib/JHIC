<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FacilityController extends Controller
{
    public function index()
    {
        $facility = Facility::all();
        return response()->json([
            'data' => $facility
        ], 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'room_total' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('facilities', 'public');
        }

        $facility = Facility::create($request->all());
        $facility->image = $path ?? null;
        $facility->save();

        return response()->json([
            'message' => 'Facility Created Successfully',
            'data' => $facility
        ], 201);
    }

    public function show($id)
    {
        $facility = Facility::find($id);
        if (!$facility) {
            return response()->json([
                'message' => 'Facility NOt Found'
            ], 404);
        }

        return response()->json([
            'data' => $facility
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $facility =  Facility::find($id);

        if (!$facility) {
            return response()->json([
                'message' => ' Facility NOt Found'
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'room_total' => 'sometimes|integer'
        ]);

        if (request()->hasFile('image')) {
            $path = $request->file('image')->store('facilities', 'public');
            $facility->image = $path;
        }

        $facility->update($request->all());

        return response()->json([
            'message' => 'Facility Updated Successfully',
            'data' => $facility
        ], 200);
    }

    public function delete($id)
    {
        $facility = Facility::find($id);
        if (!$facility) {
            return response()->json([
                'message' => 'Facility Not Found'
            ], 404);
        }

        if($facility->image){
            Storage::disk('public')->delete($facility->image);
        }

        $facility->delete();
        return response()->json([
            'message' => 'Facility Deleted Successfully'
        ], 200);
    }
}
