<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Announcement\AnnouncementStoreRequest;
use App\Http\Requests\Announcement\AnnouncementUpdateRequest;
use App\Models\Announcement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Expr\FuncCall;

class AnnouncementsController extends Controller
{
    public function index(Request $request)
    {
        $announcement = Announcement::applyFilters(
            $request,
            searchable: ['title', 'content'],
            filters: ['category_id'],
            relationFilters: ['category.name' => 'category_name']
        );
        return $this->cursorPaginated($announcement, 'Announcements retrieved successfully');
    }

    public function create(AnnouncementStoreRequest $request)
    {
        $validated = $request->validated();

        $createData = [
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
        ];

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

    public function update(AnnouncementUpdateRequest $request, $id)
    {
        $validated = $request->validated();
        $updateData = [
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
        ];

        $announcement = Announcement::find($id);
        if (!$announcement) {
            return $this->notFound('Announcement not found');
        }

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

    public function restore($id){
        $announcement = Announcement::withTrashed()->find($id);
        if (!$announcement) {
            return $this->notFound("Announcement not found");
        }
        $announcement->restore();
        return $this->statusMessage("Announcement restored successfully");
    }
}
