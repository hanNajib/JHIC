<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\ArticleStoreRequest;
use App\Http\Requests\Article\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index(Request $request) {
        $data = Article::applyFilters(
            $request,
            ['title', 'content', 'slug'],
            ['author_id', 'status']
        );
        return $this->cursorPaginated(ArticleResource::collection($data));
    }

    public function show($id) {
        $article = Article::find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }
        return $this->success(new ArticleResource($article), 'Article retrieved successfully');
    } 

    public function showBySlug($slug) {
        $article = Article::whereSlug($slug)->first();
        if (!$article) {
            return $this->notFound('Article not found');
        }
        return $this->success(new ArticleResource($article), 'Article retrieved successfully');
    }

    public function store(ArticleStoreRequest $request) {
        $validated = $request->validated();
        if($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
            $validated['image'] = $imagePath;
        }
        $validated['author_id'] = Auth::id();
        $article = Article::create($validated);
        if(isset($validated['categories'])) {
            $article->categories()->sync($validated['categories']);
        }
        return $this->success(new ArticleResource($article), 'Article created successfully');
    }

    public function update(ArticleUpdateRequest $request, $id) {
        $article = Article::find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }
        $validated = $request->validated();
        if($request->hasFile('image')) {
            if($article->image) {
                Storage::disk('public')->delete($article->image);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
            $validated['image'] = $imagePath;
        }
        $article->update($validated);
        if(isset($validated['categories'])) {
            $article->categories()->sync($validated['categories']);
        }
        return $this->success(new ArticleResource($article), 'Article updated successfully');
    }

    public function delete($id) {
        $article = Article::find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }
        if($article->image) {
            Storage::disk('public')->delete($article->image);
        }
        $article->delete();
        return $this->deleted('Article deleted successfully');
    }
}
