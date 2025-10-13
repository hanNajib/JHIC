<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::applyFilters(
            $request,
            ['type', 'name', 'color'],
            []
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
            'name' => 'required|string|unique:categories,name|max:255',
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

        $validated = $request->validate([
            'type' => 'sometimes|required|string|max:255',
            'name' => 'sometimes|required|string|unique:categories,name,' . $id . '|max:255',
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

}
