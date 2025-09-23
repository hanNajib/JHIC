<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Major;
use Illuminate\Support\Facades\Storage;

class MajorsController extends Controller
{
    public function index()
    {
        $major = Major::all();
        return response()->json([
            'data' => $major
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:majors,name',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('majors', 'public');
        }

        $major = Major::create($request->all());
        $major->image = $path ?? null;
        $major->save();

        return response()->json([
            'message' => 'Major created successfully',
            'data' => $major
        ], 201);
    }

    public function show($id)
    {
        $major = Major::find($id);
        if (!$major) {
            return response()->json([
                'message' => 'Major not found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|unique:majors,name,' . $id,
            'description' => 'sometimes|required|string',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $major = Major::find($id);
        if (!$major) {
            return response()->json([
                'message' => 'major not found'
            ], 404);
        }
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('majors', 'public');
            $major->image = $path;
        }
        $major->update($request->all());

        return response()->json([
            'message' => 'Major updated successfully',
            'data' => $major
        ]);
    }

    public function delete($id)
    {
        $major = Major::find($id);
        if (!$major) {
            return response()->json([
                'message' => 'Major not found'
            ], 404);
        }

        if ($major->image) {
            Storage::disk('public')->delete($major->image);
        }
        $major->delete();
        return response()->json([
            'message' => 'Major deleted successfully'
        ]);
    }
}
