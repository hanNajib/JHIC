<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

trait AutoCacheable
{
    protected static function bootAutoCacheable(): void
    {
        static::saved(function ($model) {
            static::logDebug("Model saved — bumping cache version", ['model' => static::class]);
            $model->bumpCacheVersion();
        });

        static::deleted(function ($model) {
            static::logDebug("Model deleted — bumping cache version", ['model' => static::class]);
            $model->bumpCacheVersion();
        });
    }

    public static function cachedFind($id, $ttl = null)
    {
        $key = static::cacheKey("find:{$id}");
        static::logDebug("cachedFind called", ['key' => $key]);

        return static::remember($key, $ttl, function () use ($id) {
            static::logDebug("Cache MISS — fetching find($id)");
            return static::find($id)?->toArray();
        });
    }

    public static function cachedAll($ttl = null)
    {
        $key = static::cacheKey("all");
        static::logDebug("cachedAll called", ['key' => $key]);

        return static::remember($key, $ttl, function () {
            static::logDebug("Cache MISS — fetching all()");
            return static::all()->toArray();
        });
    }

    public static function remember(string $key, $ttl, callable $callback)
    {
        $ttl = is_int($ttl) ? $ttl + random_int(-30, 30) : 300;

        if (Cache::store('redis')->has($key)) {
            static::logDebug("Cache HIT", ['key' => $key]);
        } else {
            static::logDebug("Cache MISS", ['key' => $key]);
        }

        $value = Cache::store('redis')->remember($key, $ttl, $callback);
        static::logDebug("Cached value stored", ['key' => $key, 'ttl' => $ttl]);

        return $value;
    }

    protected function rememberSafe($key, $ttl, $callback)
    {
        $lockKey = "lock:{$key}";
        $lock = Cache::lock($lockKey, 5);
        static::logDebug("rememberSafe called", ['key' => $key]);

        try {
            if ($lock->get()) {
                static::logDebug("Lock acquired", ['lockKey' => $lockKey]);
                return Cache::remember($key, $ttl, $callback);
            }

            static::logDebug("Lock busy, returning cached or fallback");
            return Cache::get($key) ?? $callback();
        } finally {
            optional($lock)->release();
            static::logDebug("Lock released", ['lockKey' => $lockKey]);
        }
    }

    protected static function cacheKey(string $suffix): string
    {
        $model = Str::snake(class_basename(static::class));
        $version = static::cacheVersion();
        $key = "model_cache:{$model}:v{$version}:{$suffix}";
        static::logDebug("Generated cache key", ['key' => $key]);
        return $key;
    }

    protected static function cacheVersionKey(): string
    {
        $model = Str::snake(class_basename(static::class));
        return "model_cache:{$model}:version";
    }

    protected static function cacheVersion(): int
    {
        $versionKey = static::cacheVersionKey();
        $version = Cache::store('redis')->get($versionKey, 0);
        static::logDebug("Cache version", ['key' => $versionKey, 'version' => $version]);
        return $version;
    }

    public function bumpCacheVersion(): void
    {
        $versionKey = static::cacheVersionKey();
        Cache::store('redis')->increment($versionKey, 1);
        static::logDebug("Cache version bumped", ['key' => $versionKey]);
    }

    public static function clearCache(): void
    {
        $versionKey = static::cacheVersionKey();
        Cache::store('redis')->increment($versionKey, 1);
        static::logDebug("Cache cleared via version bump", ['key' => $versionKey]);
    }

    public function cacheCursorResult(Request $request, $result)
    {
        $key = sprintf("%s:cursor:%s", $this->getTable(), md5($request->fullUrl()));
        static::logDebug("cacheCursorResult called", ['key' => $key]);

        return $this->rememberSafe($key, 300, fn() => $result);
    }

    /**
     * Logging helper, aktif cuma kalau APP_DEBUG = true
     */
    protected static function logDebug(string $message, array $context = []): void
    {
        if (Config::get('app.debug', false)) {
            Log::debug("[AutoCacheable] {$message}", $context);
        }
    }
}
