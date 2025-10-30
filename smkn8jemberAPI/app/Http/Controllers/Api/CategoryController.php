<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::applyFilters(
            $request,
            ['type', 'name', 'color'],
            ['type']
        );
        return $this->cursorPaginated($query, 'Categories retrieved successfully');
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Category not found');
        }
        return $this->success($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')->where(function ($query) use ($request) {
                    return $query->where('type', $request->input('type'));
                }),
            ],
            'color' => 'nullable|string|max:7',
        ]);

        try {
            $category = Category::create($validated);
            return $this->created($category, 'Category created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Category not found');
        }

        $typeForUnique = $request->has('type') ? $request->input('type') : $category->type;

        $validated = $request->validate([
            'type' => 'sometimes|required|string|max:255',
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('categories')
                    ->ignore($id)
                    ->where(function ($query) use ($typeForUnique) {
                        $query->where('type', $typeForUnique);
                    }),
            ],
            'color' => 'nullable|string|max:7',
        ]);

        try {
            $category->update($validated);
            return $this->success($category, 'Category updated successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Category not found');
        }

        $category->delete();
        return $this->success(null, 'Category deleted successfully');
    }

    public function restore($id)
    {
        $category = Category::withTrashed()->find($id);
        if (!$category) {
            return $this->notFound("Category not found");
        }
        $category->restore();
        return $this->statusMessage("Category restored successfully");
    }

    public function forceDelete($id)
    {
        $category = Category::withTrashed()->find($id);
        if (!$category) {
            return $this->notFound('Category not found');
        }
        $category->forceDelete();
        return $this->deleted('Category permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Category::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted categories found with the provided IDs');
        }

        return $this->statusMessage($restored . ' category(ies) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $categories = Category::withTrashed()->whereIn('id', $ids)->get();
        
        if ($categories->isEmpty()) {
            return $this->notFound('No categories found with the provided IDs');
        }

        Category::withTrashed()->whereIn('id', $ids)->forceDelete();
        return $this->deleted(count($categories) . ' category(ies) permanently deleted');
    }

}
