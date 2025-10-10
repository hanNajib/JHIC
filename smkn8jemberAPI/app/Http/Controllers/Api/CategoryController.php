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
            'color' => 'nullable|string|regex:/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/',
        ]);

        $category = Category::create($validated);
        return $this->created($category, 'Category created successfully');
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
            'color' => 'nullable|string|regex:/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/',
        ]);

        $category->update($validated);
        return $this->success($category, 'Category updated successfully');
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

}
