<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Expr\FuncCall;

class AnnouncementsController extends Controller
{
    public function index()
    {
        $announcement = Announcement::all();
        return response()->json([
            'data' => $announcement
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('announcements', 'public');
        }

        $announcement = Announcement::create($request->all());
        $announcement->image = $path ?? null;
        $announcement->save();

        return response()->json([
            'message' => 'Announcement created successfully',
            'data' => $announcement
        ], 201);
    }

    public function show($id)
    {
        $announcement = Announcement::find($id);
        if (!$announcement) {
            return response()->json([
                'message' => 'Announcement not found'
            ], 404);
        }
        return response()->json([
            'data' => $announcement
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'sometimes|required|string',
        ]);

        $announcement = Announcement::find($id);
        if (!$announcement) {
            return response()->json([
                'message' => 'Announcement not found'
            ], 404);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('announcements', 'public');
            $announcement->image = $path;
        }

        $announcement->update($request->all());
        return response()->json([
            'message' => 'Announcement updated successfully',
            'data' => $announcement,
        ], 200);
    }

    public function delete($id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'message' => 'Announcement not found'
            ], 404);
        }

        if ($announcement->image) {
            Storage::disk('public')->delete($announcement->image);
        }
        $announcement->delete();

        return response()->json([
            'message' => 'announcement deleted successfully'
        ], 200);
    }
}
