<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
         $gallery = Gallery::with('categories')->applyFilters(
            $request,
            searchable: ['title', 'description'],
            filters: [],
            relationFilters: ['categories.name' => 'category_name']
        );
        return $this->cursorPaginated(GalleryResource::collection($gallery), 'Gallery retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
            'category' => 'nullable|array',
            'category.*' => 'exists:categories,id'
        ]);

        $createData = $request->only(['title', 'description', 'category']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('gallery', 'public');
            $createData['image'] = $imagePath;
        }

        $gallery = Gallery::create($createData);
        $gallery->categories()->attach($createData['category']);
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
            'image' => 'sometimes|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
            'category' => 'sometimes|array',
            'category.*' => 'exists:categories,id'
        ]);

        $gallery = Gallery::find($id);
        if (!$gallery) {
            return $this->notFound('Gallery not found');
        }

        $updateData = $request->only(['title', 'description', 'category']);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('gallery', 'public');
            $updateData['image'] = $imagePath;
        }
        $gallery->update($updateData);
        if (isset($updateData['category'])) {
            $gallery->categories()->sync($updateData['category']);
        }
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

    public function forceDelete($id)
    {
        $gallery = Gallery::withTrashed()->find($id);
        if (!$gallery) {
            return $this->notFound('Gallery not found');
        }

        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->originalImagePath());
        }
        $gallery->forceDelete();
        return $this->deleted('Gallery permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Gallery::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();

        if ($restored === 0) {
            return $this->notFound('No deleted galleries found with the provided IDs');
        }

        return $this->statusMessage($restored . ' gallery(ies) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $galleries = Gallery::withTrashed()->whereIn('id', $ids)->get();

        if ($galleries->isEmpty()) {
            return $this->notFound('No galleries found with the provided IDs');
        }

        foreach ($galleries as $gallery) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->originalImagePath());
            }
            $gallery->forceDelete();
        }

        return $this->deleted(count($galleries) . ' gallery(ies) permanently deleted');
    }
}
