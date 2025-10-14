<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

trait HasCursorPagination
{

    public function scopeApplyFilters(
        $query,
        Request $request,
        array $searchable = [],
        array $filters = [],
        array $relationFilters = []
    ): CursorPaginator {
        $this->validatePaginationParams($request);

        $limit = min((int) $request->query('limit', 10), $this->getMaxLimit());
        $sortBy = $this->sanitizeSortColumn($request->query('sortBy', 'created_at'));
        $sortDir = strtolower($request->query('sortDir', 'asc')) === 'desc' ? 'desc' : 'asc';
        $search = trim($request->query('s', ''));
        $trashed = $request->boolean('trashed', false);
        $all = $request->boolean('all', false);

        $query = $this->applyDynamicFilters($query, $request, $filters);
        $query = $this->applyRelationFilters($query, $request, $relationFilters);
        $query = $this->applySearch($query, $search, $searchable);

        if ($this->isValidSortColumn($sortBy)) {
            $query = $query->orderBy($sortBy, $sortDir);
        } else {
            $query = $query->orderBy('created_at', 'asc');
            Log::warning("Invalid sort column attempted: {$sortBy}");
        }

        if ($trashed && $this->usesSoftDeletes()) {
            $query = $query->onlyTrashed();
        }

        if ($all) {
            $limit = $this->getMaxLimit();
        }

        $result = $query->cursorPaginate($limit)->withQueryString();

        $result->through(function ($item) {
            if (property_exists($item, 'appends') && is_array($item->appends)) {
                $item->append($item->appends);
            }
            return $item;
        });


        return $result;
    }

    /**
     * Validasi parameter pagination
     */
    protected function validatePaginationParams(Request $request): void
    {
        $validator = Validator::make($request->query(), [
            'limit' => 'nullable|integer|min:1|max:' . $this->getMaxLimit(),
            'sortBy' => 'nullable|string|max:50',
            'sortDir' => 'nullable|in:asc,desc,ASC,DESC',
            's' => 'nullable|string|max:255',
            'trashed' => 'nullable|in:true,false,1,0',
            'all' => 'nullable|in:true,false,1,0',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Apply dynamic filters dengan sanitasi
     */
    protected function applyDynamicFilters($query, Request $request, array $filters)
    {
        foreach ($filters as $field) {
            if ($request->filled($field)) {
                $value = $request->query($field);

                if ($this->isValidFilterField($field)) {
                    if (is_array($value)) {
                        $query = $query->where(function ($q) use ($field, $value) {
                            $q->whereIn($field, $value);

                            if (in_array('all', $value)) {
                                $q->orWhere($field, 'all');
                            }
                        });
                    } else {
                        // kalau single value biasa
                        $query = $query->where($field, $value)
                            ->orWhere($field, 'all'); // biar 'all' tetap ikut juga
                    }
                } else {
                    Log::warning("Invalid filter field attempted: {$field}");
                }
            }
        }

        return $query;
    }


    /**
     * Apply filters untuk relasi
     * Format: ['relation.field' => 'param_name'] atau ['relation.field']
     */
    protected function applyRelationFilters($query, Request $request, array $relationFilters)
    {
        foreach ($relationFilters as $key => $value) {
            if (is_string($key)) {
                $relationField = $key;
                $paramName = $value;
            } else {
                $relationField = $value;
                $paramName = str_replace('.', '_', $value);
            }

            if ($request->filled($paramName)) {
                $parts = explode('.', $relationField);

                if (count($parts) !== 2) {
                    Log::warning("Invalid relation filter format: {$relationField}");
                    continue;
                }

                $relation = $parts[0];
                $field = $parts[1];
                $filterValue = $request->query($paramName);

                $query = $query->whereHas($relation, function ($q) use ($field, $filterValue) {
                    $q->where($field, $filterValue);
                });
            }
        }

        return $query;
    }

    /**
     * Apply search dengan proteksi SQL injection
     */
    protected function applySearch($query, string $search, array $searchable)
    {
        if (empty($search) || empty($searchable)) {
            return $query;
        }

        // Sanitasi search term
        $search = $this->sanitizeSearchTerm($search);

        return $query->where(function ($q) use ($search, $searchable) {
            foreach ($searchable as $field) {
                if (strpos($field, '.') !== false) {
                    // Search dalam relasi
                    [$relation, $column] = explode('.', $field, 2);

                    $q->orWhereHas($relation, function ($subQ) use ($column, $search) {
                        $subQ->where($column, 'like', "%{$search}%");
                    });
                } else {
                    // Search di table utama
                    if ($this->isValidSearchableField($field)) {
                        $q->orWhere($field, 'like', "%{$search}%");
                    }
                }
            }
        });
    }

    /**
     * Sanitasi search term untuk keamanan
     */
    protected function sanitizeSearchTerm(string $search): string
    {
        // Hapus karakter berbahaya
        $search = preg_replace('/[%_\\\\]/', '\\\\$0', $search);

        // Batasi panjang
        return substr($search, 0, 255);
    }

    /**
     * Validasi apakah kolom sort valid
     */
    protected function isValidSortColumn(string $column): bool
    {
        if (method_exists($this, 'getSortableColumns')) {
            return in_array($column, $this->getSortableColumns());
        }

        // Default: cek apakah kolom ada di tabel
        try {
            return Schema::hasColumn($this->getTable(), $column);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Validasi filter field
     */
    protected function isValidFilterField(string $field): bool
    {
        if (method_exists($this, 'getFilterableColumns')) {
            return in_array($field, $this->getFilterableColumns());
        }

        try {
            return Schema::hasColumn($this->getTable(), $field);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Validasi searchable field
     */
    protected function isValidSearchableField(string $field): bool
    {
        try {
            return Schema::hasColumn($this->getTable(), $field);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Sanitasi nama kolom untuk sorting
     */
    protected function sanitizeSortColumn(string $column): string
    {
        // Hanya izinkan alphanumeric dan underscore
        return preg_replace('/[^a-zA-Z0-9_]/', '', $column);
    }

    /**
     * Get max limit untuk pagination
     */
    protected function getMaxLimit(): int
    {
        return property_exists($this, 'maxPaginationLimit')
            ? $this->maxPaginationLimit
            : 1000;
    }

    /**
     * Cek apakah model menggunakan soft deletes
     */
    protected function usesSoftDeletes(): bool
    {
        return in_array(
            'Illuminate\\Database\\Eloquent\\SoftDeletes',
            class_uses_recursive(static::class)
        );
    }

    /**
     * Cache hasil jika applicable
     */
    protected function cacheIfApplicable(Request $request, CursorPaginator $result)
    {
        if (method_exists($this, 'cacheCursorResult')) {
            return $this->cacheCursorResult($request, $result);
        }

        return $result;
    }
}
