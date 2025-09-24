<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Expr\FuncCall;

class AnnouncementsController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $announcement = Announcement::all();
        return $this->success($announcement, 'Announcements retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $createData = $request->only(['title', 'content', 'category_id']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
            $createData['image'] = $imagePath;
        }

        $announcement = Announcement::create($createData);
        return $this->created($announcement, 'Announcement created successfully');
    }

    public function show($id)
    {
        $announcement = Announcement::find($id);
        if (!$announcement) {
            return $this->notFound('Announcement not found');
        }
        return $this->success($announcement);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'sometimes|required|string',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $announcement = Announcement::find($id);
        if (!$announcement) {
            return $this->notFound('Announcement not found');
        }

        $updateData = $request->only(['title', 'content', 'category_id']);

        if ($request->hasFile('image')) {
            if ($announcement->OriginalImagePath()) {
                Storage::disk('public')->delete($announcement->OriginalImagePath());
            }
            
            $imagePath = $request->file('image')->store('announcements', 'public');
            $updateData['image'] = $imagePath;
        }

        $announcement->update($updateData);
        return $this->updated($announcement, 'Announcement updated successfully');
    }

    public function delete($id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return $this->notFound('Announcement not found');
        }

        if ($announcement->image) {
            Storage::disk('public')->delete($announcement->image);
        }
        $announcement->delete();

        return $this->deleted('Announcement deleted successfully');
    }
}
