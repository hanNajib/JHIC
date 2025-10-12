<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
         $gallery = Gallery::applyFilters(
            $request,
            ['title', 'description'],
            []
        );
        return $this->cursorPaginated($gallery, 'Gallery retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
        ]);

        $createData = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('gallery', 'public');
            $createData['image'] = $imagePath;
        }

        $gallery = Gallery::create($createData);
        return $this->created($gallery, 'Gallery created successfully');
    }

    public function show($id)
    {
        $gallery = Gallery::find($id);
        if (!$gallery) {
            return $this->notFound('Gallery not found');
        }
        return $this->success($gallery);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|nullable|string',
            'image' => 'sometimes|image|mimes:jpeg,jpg,png,gif,svg|max:2048'
        ]);

        $gallery = Gallery::find($id);
        if (!$gallery) {
            return $this->notFound('Gallery not found');
        }

        $updateData = $request->only(['title', 'description']);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('gallery', 'public');
            $updateData['image'] = $imagePath;
        }
        $gallery->update($updateData);
        return $this->success($gallery, 'Gallery updated successfully');
    }

    public function delete($id)
    {
        $gallery = Gallery::find($id);
        if (!$gallery) {
            return $this->notFound('Gallery not found');
        }
        $gallery->delete();
        return $this->statusMessage( 'Gallery deleted successfully');
    }

    public function restore($id){
        $gallery = Gallery::withTrashed()->find($id);
        if (!$gallery) {
            return $this->notFound("Gallery not found");
        }
        $gallery->restore();
        return $this->statusMessage("Gallery restored successfully");
    }
}
