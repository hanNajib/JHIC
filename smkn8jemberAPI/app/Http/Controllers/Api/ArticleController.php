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
    public function index(Request $request)
    {
        $articlesPaginated = Article::published()->with(['author', 'categories'])->applyFilters(
            $request,
            searchable: ['title', 'content', 'slug'],
            filters: ['author_id', 'status'],
            relationFilters: [
                'categories.name' => 'category_name',
                'author.id' => 'author_id',
                'author.username' => 'author',
            ],
        );
        return $this->cursorPaginatedResource($articlesPaginated, ArticleResource::class, 'Articles retrieved successfully');
    }


    public function show($slug, Request $request)
    {
        $IncrementView = $request->boolean('increment_view', true);
        $article = Article::whereSlug($slug)
            ->with(['author', 'categories'])
            ->first();


        if (!$article) {
            return $this->notFound('Article not found');
        }

        $ip = request()->ip();
        $cacheKey = 'article_viewed_' . $article->id . '_' . $ip;

        if (!cache()->has($cacheKey) && $IncrementView) {
            $article->increment('views');
            cache()->put($cacheKey, true, now()->addMinutes(30));
        }

        return $this->success(
            new ArticleResource($article),
            'Article retrieved successfully'
        );
    }


    public function store(ArticleStoreRequest $request)
    {
        $validated = $request->validated();
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
            $validated['image'] = $imagePath;
        }
        $validated['author_id'] = Auth::id();
        $validated['slug'] = $request->title;
        $validated['status'] = $request->draft ? 'draft' : (Auth::user()->role === 'superadmin' ? 'published' : 'pending');
        $article = Article::create($validated);
        if (isset($validated['categories'])) {
            $article->categories()->sync($validated['categories']);
        }
        return $this->success(new ArticleResource($article), 'Article created successfully');
    }

    public function update(ArticleUpdateRequest $request, $id)
    {
        $article = Article::find($id);

        if (
            !$article ||
            ($article->author_id !== Auth::id() && Auth::user()->role !== 'superadmin')
        ) {
            return $this->notFound('Article not found');
        }

        $validated = $request->validated();

        if ($request->has('draft')) {
            $isDraft = filter_var($request->draft, FILTER_VALIDATE_BOOLEAN);
            $validated['status'] = $isDraft ? 'draft' : (Auth::user()->role === 'superadmin' ? 'published' : 'pending');
        }

        if ($request->hasFile('image')) {
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
            $validated['image'] = $imagePath;
        }

        $article->update($validated);

        if (array_key_exists('categories', $validated)) {
            $article->categories()->sync($validated['categories'] ?? []);
        }


        return $this->success(new ArticleResource($article), 'Article updated successfully');
    }


    public function delete($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }

        if ($article->author_id !== Auth::id() ) {
            return $this->error('You are not authorized to delete this article', 403);
        }
        $article->delete();
        return $this->deleted('Article deleted successfully');
    }

    public function restore($id)
    {
        $article = Article::withTrashed()->find($id);
        if (!$article) {
            return $this->notFound("Admin not found");
        }
        $article->restore();
        return $this->statusMessage("Admin restored successfully");
    }

    public function forceDelete($id)
    {
        $article = Article::withTrashed()->find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }

        if ($article->image) {
            Storage::disk('public')->delete($article->image);
        }
        $article->forceDelete();
        return $this->deleted('Article permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Article::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted articles found with the provided IDs');
        }

        return $this->statusMessage($restored . ' article(s) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $articles = Article::withTrashed()->whereIn('id', $ids)->get();
        
        if ($articles->isEmpty()) {
            return $this->notFound('No articles found with the provided IDs');
        }

        foreach ($articles as $article) {
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }
            $article->forceDelete();
        }

        return $this->deleted(count($articles) . ' article(s) permanently deleted');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,published,rejected',
        ]);

        $article = Article::find($id);
        if (!$article) {
            return $this->notFound('Article not found');
        }

        $article->status = $request->status;
        $article->save();

        return $this->success(new ArticleResource($article), 'Article status updated successfully');
    }
}
