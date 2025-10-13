<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Announcement;
use App\Models\Gallery;
use App\Models\Major;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::applyFilters(
            $request,
            ['title', 'content'],
            ['category_id']
        );

        $announcements = Announcement::applyFilters(
            $request,
            ['title', 'content'],
            ['category_id']
        );

        $galleries = Gallery::applyFilters(
            $request,
            ['title', 'description'],
            ['category_id']
        );

        $majors = Major::applyFilters(
            $request,
            ['name', 'short_name', 'description']
        );

        $results = [
            'articles' => $articles,
            'announcements' => $announcements,
            'galleries' => $galleries,
            'majors' => $majors,
        ];

        return response()->json([
            'message' => 'Data retrieved successfully',
            'data' => $results,
        ], 200);
    }
}
