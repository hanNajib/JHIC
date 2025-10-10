# 📋 Postman Testing Guide - SMKN 8 Jember API

## 🎯 Overview
Collection Postman ini dilengkapi dengan **automated testing scripts** untuk memastikan semua endpoint API berfungsi dengan baik.

## 📦 Setup

### 1. Import Collection
1. Buka Postman
2. Click **Import** → Pilih file `SMKN8_Jember_API.postman_collection.json`
3. Collection akan muncul di sidebar

### 2. Environment Setup
Collection sudah include variables:
- `base_url`: http://127.0.0.1:8000/api
- `auth_token`: Otomatis terisi setelah login
- ID variables: Otomatis tersimpan dari response

## 🧪 Testing Features

### Automated Tests yang Tersedia:

#### ✅ **Authentication Tests**
- **Login**
  - Status code validation (200)
  - Response time check (< 2000ms)
  - Response structure validation
  - Token format validation
  - Auto-save token ke variable
  - Success flag verification

- **Logout**
  - Status code validation
  - Success message check
  - Auto-clear token

- **Get User Info (Me)**
  - Authentication verification
  - User data structure validation
  - Required fields check

#### ✅ **CRUD Endpoint Tests** (All Resources)

**GET All (List)**
- Status code 200
- Response time check (< 3000ms)
- Data array validation
- Data structure validation
- Auto-save first ID for detail request

**GET Single (Detail)**
- Status code 200 or 404
- Data structure validation
- Image URL format check
- Not found error handling

**POST (Create)**
- Status code 201 or 200
- Created data validation
- ID generation check
- Input data matching
- Auto-save created ID
- Authentication requirement check

**PUT (Update)**
- Status code 200 or 404
- Updated data validation
- Input matching verification
- Image update handling
- Old image deletion verification

**DELETE**
- Status code 200 or 404
- Deletion confirmation
- Message validation
- Authentication check

## 🚀 How to Run Tests

### Option 1: Manual Testing
1. **Login First**
   - Jalankan request "Login" di folder Auth
   - Token otomatis tersimpan
   
2. **Test Individual Endpoint**
   - Pilih endpoint yang ingin ditest
   - Click **Send**
   - Lihat hasil test di tab **Test Results**

### Option 2: Run Entire Collection
1. Click kanan pada collection name
2. Pilih **Run collection**
3. Pilih folder atau endpoints yang ingin ditest
4. Click **Run SMKN 8 Jember API**
5. Lihat hasil semua test

### Option 3: Run with Newman (CLI)
```bash
# Install Newman
npm install -g newman

# Run collection
newman run SMKN8_Jember_API.postman_collection.json

# Run with environment
newman run SMKN8_Jember_API.postman_collection.json -e environment.json

# Generate HTML report
newman run SMKN8_Jember_API.postman_collection.json --reporters cli,html --reporter-html-export report.html
```

## 📊 Test Categories

### 1. Response Validation
- Status code checks
- HTTP method validation
- Response time performance

### 2. Data Structure Validation
- Required fields presence
- Data types verification
- Nested object/array validation

### 3. Business Logic Tests
- Authentication requirements
- Authorization checks
- Data integrity validation
- Image upload/deletion

### 4. Error Handling
- 404 Not Found scenarios
- 401 Unauthorized checks
- Validation error messages

## 🔑 Authentication Flow

```
1. POST /auth/login
   ↓ (Auto-save token)
2. Token available for all protected endpoints
   ↓
3. All POST/PUT/DELETE requests use Bearer token
   ↓
4. POST /auth/logout (Clear token)
```

## 📝 Test Results Interpretation

### ✅ Green Checkmark
- Test passed successfully
- Endpoint working as expected

### ❌ Red X
- Test failed
- Check:
  1. Is server running?
  2. Is database seeded?
  3. Are you logged in?
  4. Is the data valid?

### 🔶 Warning
- Status code acceptable but not ideal
- May need attention

## 🎯 Test Coverage

### Resources Tested:
1. ✅ **Authentication** (3 endpoints)
   - Login, Logout, Me

2. ✅ **Announcements** (5 endpoints)
   - Full CRUD with image upload

3. ✅ **Facilities** (5 endpoints)
   - Full CRUD with image upload

4. ✅ **Majors** (5 endpoints)
   - Full CRUD with image upload

5. ✅ **Partners** (5 endpoints)
   - Full CRUD with image + major relation

6. ✅ **Extracurriculars** (5 endpoints)
   - Full CRUD with image upload

7. ✅ **Chance Carriers** (5 endpoints)
   - Full CRUD with image + major relation

8. ✅ **Gallery** (5 endpoints)
   - Full CRUD with image upload

9. ✅ **Subjects** (5 endpoints)
   - Full CRUD with major relation

10. ✅ **School Data** (3 endpoints)
    - Read and Update only

11. ✅ **Articles** (6 endpoints)
    - Full CRUD + slug endpoint + categories

**Total: 52 endpoints with automated tests**

## 💡 Tips & Best Practices

### 1. Test Order Matters
Jalankan tests dalam urutan:
```
1. Login (untuk mendapat token)
2. Create (untuk membuat data)
3. Get All (untuk list data)
4. Get Single (untuk detail)
5. Update (untuk edit data)
6. Delete (untuk hapus data)
```

### 2. Data Dependencies
- Beberapa endpoint butuh data exist (categories, majors)
- Pastikan seed database terlebih dahulu
- Gunakan ID yang valid

### 3. Image Upload Testing
- Untuk test image upload, attach file di form-data
- Format: JPG, PNG, GIF
- Max size sesuai validation di backend
- Old images akan otomatis terhapus saat update

### 4. Collection Variables
Variables otomatis tersimpan:
- `{{auth_token}}` - dari login
- `{{announcement_id}}` - dari get all
- `{{created_announcement_id}}` - dari create
- Dst untuk resource lainnya

### 5. Failed Test Debugging
Jika test gagal:
```javascript
// Check console untuk detail error
console.log(pm.response.json());

// Lihat response body
// Lihat response headers
// Check request yang dikirim
```

## 🔧 Customization

### Modify Base URL
```json
// Di Collection Variables
"base_url": "https://your-production-url.com/api"
```

### Add Custom Tests
```javascript
// Di tab "Tests" setiap request
pm.test("Your custom test", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.custom_field).to.exist;
});
```

### Modify Response Time Threshold
```javascript
// Default: 3000ms
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000); // Change to 1000ms
});
```

## 📈 Performance Testing

Collection ini juga bisa digunakan untuk:
- Load testing dengan Newman
- Performance benchmarking
- CI/CD integration
- Automated regression testing

## 🐛 Troubleshooting

### Token Not Saved
- Pastikan login response structure benar
- Check console log: "Token saved: ..."
- Verify token di Collection Variables

### Tests Always Fail
1. Check server is running: `php artisan serve`
2. Verify base_url correct
3. Database seeded properly
4. CORS configured

### Image Upload Fails
- Check storage linked: `php artisan storage:link`
- Verify permissions on storage folder
- Check file size limits
- Ensure Content-Type: multipart/form-data

## 📚 Resources

- [Postman Testing Documentation](https://learning.postman.com/docs/writing-scripts/test-scripts/)
- [Newman CLI](https://www.npmjs.com/package/newman)
- [Chai Assertion Library](https://www.chaijs.com/api/bdd/)

## 🎉 Success Metrics

Semua test hijau = API siap production! ✅

```
Test Results:
┌─────────────────────────┬────────────┬────────────┐
│                         │   executed │     failed │
├─────────────────────────┼────────────┼────────────┤
│              iterations │          1 │          0 │
├─────────────────────────┼────────────┼────────────┤
│                requests │         52 │          0 │
├─────────────────────────┼────────────┼────────────┤
│            test-scripts │        156 │          0 │
├─────────────────────────┼────────────┼────────────┤
│      prerequest-scripts │          0 │          0 │
├─────────────────────────┼────────────┼────────────┤
│              assertions │        312 │          0 │
└─────────────────────────┴────────────┴────────────┘
```

---

**Happy Testing! 🚀**

Created for SMKN 8 Jember API
Version: 1.0 with Complete Testing Suite
