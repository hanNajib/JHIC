<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Log;

trait HasCursorPagination
{
    /**
     * Terapkan filter, pencarian, sorting, dan pagination berbasis cursor.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $searchable
     * @param  array  $filters
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function scopeApplyFilters($query, Request $request, array $searchable = [], array $filters = []): CursorPaginator
    {
        $limit = (int) $request->query('limit', 10);
        $sortBy = $request->query('sortBy', 'created_at');
        $sortDir = $request->query('sortDir', 'desc');
        $search = trim($request->query('s', ''));
        $trashed = $request->boolean('trashed', false);
        $all = $request->boolean('all', false);

        $query = $this->applyDynamicFilters($query, $request, $filters);
        $query = $this->applySearch($query, $search, $searchable);
        $query = $query->orderBy($sortBy, $sortDir);
        if ($trashed && $this->usesSoftDeletes()) {
            $query = $query->onlyTrashed();
        }
        if ($all) {
            $limit = 1000;
        }

        $result = $query->cursorPaginate($limit)->withQueryString();

        return $this->cacheIfApplicable($request, $result);
    }


    protected function applyDynamicFilters($query, Request $request, array $filters)
    {
        foreach ($filters as $field) {
            if ($request->filled($field)) {
                $query = $query->where($field, $request->query($field));
            }
        }

        return $query;
    }

    protected function applySearch($query, string $search, array $searchable)
    {
        if ($search && !empty($searchable)) {
            $query = $query->where(function ($q) use ($search, $searchable) {
                foreach ($searchable as $field) {
                    $q->orWhere($field, 'like', "%{$search}%");
                }
            });
        }

        return $query;
    }

    protected function usesSoftDeletes(): bool
    {
        return in_array('Illuminate\\Database\\Eloquent\\SoftDeletes', class_uses_recursive(static::class));
    }

    protected function cacheIfApplicable(Request $request, CursorPaginator $result)
    {
        if (method_exists($this, 'cacheCursorResult')) {
            return $this->cacheCursorResult($request, $result);
        }

        return $result;
    }
}
