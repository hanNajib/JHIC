# 🚀 Cache Performance Testing Guide

## Overview
Panduan ini menjelaskan cara melakukan testing performa caching Redis yang telah diimplementasikan menggunakan trait `AutoCacheable` pada model Article.

## 📊 Test Data
- **16 Articles** telah dibuat menggunakan `ArticleSeeder`
- **4 Categories**: Berita Sekolah, Prestasi, Kegiatan, Pengumuman
- **Status**: 15 Published, 1 Draft
- **Views**: Random 10-500 untuk setiap artikel

## 🧪 Cache Performance Tests di Postman Collection

### 1. 🔥 Cache Performance Test - First Request
**Tujuan**: Mengukur response time untuk request pertama (cache miss)

**Test yang dilakukan**:
- ✅ Status code 200
- ⏱️ Mencatat waktu response tanpa cache
- 📝 Validasi struktur data response

**Expected**: Response time lebih lambat karena query database

---

### 2. ⚡ Cache Performance Test - Second Request (Cached)
**Tujuan**: Mengukur response time untuk request kedua (cache hit)

**Test yang dilakukan**:
- ✅ Status code 200
- ⚡ Mencatat waktu response dengan cache
- 📊 Membandingkan dengan request pertama
- 🎯 Menghitung persentase improvement dan speedup

**Metrics yang ditampilkan**:
```
=== CACHE PERFORMANCE TEST ===
First Request (No Cache):  250ms
Second Request (Cached):   45ms
Improvement: 82% faster
Speed Up: 5.56x faster
==============================
```

**Success Criteria**:
- 🏆 Excellent: >50% improvement
- 👍 Good: 30-50% improvement
- ⚠️ Needs Optimization: <30% improvement

---

### 3. 🔄 Cache Invalidation Test

**Tujuan**: Memastikan cache ter-invalidasi saat data diupdate

**Test Flow**:
1. **Before Update**: Ambil data article dan simpan title
2. **Update Article**: Update article dengan title baru
3. **After Update**: Ambil data lagi dan verifikasi title berubah

**Test yang dilakukan**:
- ✅ Title berubah (cache ter-invalidasi)
- ✅ Data yang diterima adalah data fresh, bukan dari cache lama
- 🎯 Cache version ter-bump otomatis

---

### 4. 🚀 Load Test - 10 Rapid Requests (Cache Stress Test)

**Tujuan**: Menguji performa cache dengan multiple requests simultan

**Test yang dilakukan**:
- 📊 10 requests berturut-turut ke endpoint yang sama
- ⏱️ Track response time setiap request
- 📈 Hitung statistik: average, min, max, total

**Metrics yang ditampilkan**:
```
=== LOAD TEST RESULTS ===
Total Requests: 10
Average Time: 42.5ms
Fastest: 38ms
Slowest: 52ms
Total Time: 425ms
========================
```

**Success Criteria**:
- ✅ Average response time < 1000ms
- ✅ Max response time < 500ms (semua request tercache dengan baik)

---

## 🔧 Cache Implementation Details

### AutoCacheable Trait Features
```php
// Model menggunakan trait
use AutoCacheable;

// Cache otomatis dengan TTL + jitter
protected $cacheTTL = 3600; // 1 hour

// Cache key pattern
"model_cache:articles:v{version}:{suffix}"
```

### Event-Driven Cache Invalidation
```php
// Otomatis bump cache version saat:
- saved()   // Create/Update
- deleted() // Delete
```

### Cache Methods Available
- `cachedFind($id, $ttl)` - Cache single record
- `cachedAll($ttl)` - Cache all records
- `remember()` - Cache dengan closure
- `bumpCacheVersion()` - Manual invalidation
- `clearCache()` - Clear all cache

---

## 📝 Testing Workflow

### Step 1: Setup Environment
```bash
# Pastikan Redis running
redis-cli ping

# Run Article Seeder
php artisan db:seed --class=ArticleSeeder

# Check Redis cache
redis-cli keys "model_cache:*"
```

### Step 2: Run Postman Collection

**Recommended Order**:
1. ✅ **Get All Articles** - Populate article_id dan article_slug variables
2. 🔥 **Cache Performance Test - First Request** - Baseline measurement
3. ⚡ **Cache Performance Test - Second Request** - Measure cache benefit
4. 🔄 **Cache Invalidation Test - Before Update** - Save current state
5. ✏️ **Update Article** - Trigger cache invalidation
6. 🔄 **Cache Invalidation Test - After Update** - Verify fresh data
7. 🚀 **Load Test** - Stress test cache performance

### Step 3: Analyze Results

**Check Console Output** di Postman untuk melihat:
- Response times comparison
- Cache improvement percentage
- Load test statistics
- Cache invalidation verification

---

## 🎯 Expected Results

### Scenario 1: Cold Cache (First Hit)
```
Request Time: 100-300ms (depending on query complexity)
Redis Keys: 0 cache entries
Database Queries: Full query execution
```

### Scenario 2: Warm Cache (Subsequent Hits)
```
Request Time: 20-80ms (80-90% faster)
Redis Keys: Multiple cache entries
Database Queries: 0 (served from Redis)
```

### Scenario 3: After Update/Delete
```
Cache Version: Bumped from v1 to v2
Old Cache Keys: Still in Redis but unused
New Request: Miss cache, hit database, create new cache
```

---

## 🛠️ Troubleshooting

### Cache Not Working
```bash
# Check Redis connection
php artisan tinker
>>> Cache::put('test', 'value', 60);
>>> Cache::get('test');

# Check trait is loaded
>>> Article::cachedAll();
```

### Cache Not Invalidating
```bash
# Check model events
>>> Article::saved(function($model) { dd('saved event fired'); });

# Manually bump version
>>> Article::find(1)->bumpCacheVersion();

# Clear all cache
>>> Article::clearCache();
```

### Performance Not Improved
```bash
# Check Redis performance
redis-cli --latency

# Check cache TTL
>>> Cache::get('model_cache:articles:version');

# Check query complexity
>>> DB::enableQueryLog();
>>> Article::with('author', 'categories')->get();
>>> DB::getQueryLog();
```

---

## 📊 Monitoring Cache Performance

### Redis CLI Commands
```bash
# Monitor cache operations real-time
redis-cli MONITOR

# Check memory usage
redis-cli INFO memory

# List all article cache keys
redis-cli KEYS "model_cache:articles*"

# Check cache hit rate
redis-cli INFO stats | grep hit_rate
```

### Laravel Telescope (Optional)
- Install Telescope untuk visual monitoring
- Track cache hits/misses
- Monitor query performance
- Identify N+1 query problems

---

## 🎓 Best Practices

1. **TTL Strategy**
   - Use appropriate TTL based on data volatility
   - Add jitter to prevent cache stampede
   - Longer TTL for static data, shorter for dynamic

2. **Cache Invalidation**
   - Let AutoCacheable handle automatic invalidation
   - Use version bumping instead of cache deletion
   - Manual clearCache() only when necessary

3. **Performance Optimization**
   - Cache query results with relationships eagerly loaded
   - Use cursor pagination for large datasets
   - Monitor cache memory usage

4. **Testing**
   - Always test cache hit vs miss scenarios
   - Verify invalidation works correctly
   - Load test to ensure cache handles traffic

---

## 📚 Additional Resources

- Laravel Cache Documentation: https://laravel.com/docs/cache
- Redis Best Practices: https://redis.io/topics/lru-cache
- AutoCacheable Trait: `app/Traits/AutoCacheable.php`
- Article Model: `app/Models/Article.php`

---

## ✅ Quick Checklist

Before running cache tests:
- [ ] Redis server is running
- [ ] Article seeder executed successfully
- [ ] Environment variables configured (CACHE_DRIVER=redis)
- [ ] Postman collection imported
- [ ] Environment variables set (base_url, bearer_token if needed)

After running cache tests:
- [ ] Cache performance improves by >30%
- [ ] Cache invalidation works correctly
- [ ] Load test shows consistent performance
- [ ] No errors in response
- [ ] Console logs show expected metrics

---

**Happy Testing! 🚀**
