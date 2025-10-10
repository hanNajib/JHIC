# 🚀 Quick Start - Postman Testing

## 📦 Files Included

1. **SMKN8_Jember_API.postman_collection.json** - Main collection dengan automated tests
2. **SMKN8_Jember_Environment_Dev.postman_environment.json** - Development environment
3. **SMKN8_Jember_Environment_Prod.postman_environment.json** - Production environment
4. **POSTMAN_TESTING_GUIDE.md** - Dokumentasi lengkap testing
5. **POSTMAN_TEST_TEMPLATES.md** - Template test scripts

## ⚡ Quick Setup (5 Minutes)

### Step 1: Import ke Postman
```
1. Buka Postman
2. Click "Import" button
3. Drag & drop ketiga file .json
   - SMKN8_Jember_API.postman_collection.json
   - SMKN8_Jember_Environment_Dev.postman_environment.json
   - SMKN8_Jember_Environment_Prod.postman_environment.json
```

### Step 2: Pilih Environment
```
1. Di top-right corner Postman
2. Select: "SMKN 8 Jember - Development"
```

### Step 3: Run First Test
```
1. Expand collection "SMKN 8 Jember API"
2. Open folder "Auth"
3. Click "Login"
4. Click "Send" button
5. Check "Test Results" tab (should be green ✅)
```

## 🧪 Run All Tests

### Option 1: Collection Runner (GUI)
```
1. Right-click pada collection name
2. Select "Run collection"
3. Click "Run SMKN 8 Jember API"
4. Watch tests execute automatically
```

### Option 2: Newman (CLI)
```bash
# Install Newman
npm install -g newman

# Run all tests
newman run SMKN8_Jember_API.postman_collection.json \
  -e SMKN8_Jember_Environment_Dev.postman_environment.json

# With HTML report
newman run SMKN8_Jember_API.postman_collection.json \
  -e SMKN8_Jember_Environment_Dev.postman_environment.json \
  --reporters cli,html \
  --reporter-html-export test-report.html
```

## 📊 What Gets Tested?

✅ **52 Endpoints** with **150+ automated tests**

### Authentication (3 endpoints)
- Login with token validation
- Logout with token clearing
- Get user info

### Resources (49 endpoints)
- Announcements (CRUD + Image)
- Facilities (CRUD + Image)
- Majors (CRUD + Image)
- Partners (CRUD + Image)
- Extracurriculars (CRUD + Image)
- Chance Carriers (CRUD + Image)
- Gallery (CRUD + Image)
- Subjects (CRUD)
- School Data (Read/Update)
- Articles (CRUD + Slug + Image)

### Test Coverage
- ✅ Status code validation
- ✅ Response time checks
- ✅ Data structure validation
- ✅ Authentication checks
- ✅ Image upload/deletion
- ✅ Error handling
- ✅ Relationship validation

## 🎯 Test Results Example

```
┌─────────────────────────┬────────────┬────────────┐
│                         │   executed │     failed │
├─────────────────────────┼────────────┼────────────┤
│              iterations │          1 │          0 │
├─────────────────────────┼────────────┼────────────┤
│                requests │         52 │          0 │
├─────────────────────────┼────────────┼────────────┤
│            test-scripts │        156 │          0 │
├─────────────────────────┼────────────┼────────────┤
│              assertions │        312 │          0 │
└─────────────────────────┴────────────┴────────────┘
```

## 🔧 Configuration

### Change Base URL
```json
// In Environment or Collection Variables
{
  "base_url": "http://localhost:8000/api"  // Development
  "base_url": "https://api.production.com/api"  // Production
}
```

### Use Variables in Requests
```
URL: {{base_url}}/announcements
Authorization: Bearer {{auth_token}}
```

## 💡 Pro Tips

1. **Always login first** - Token diperlukan untuk POST/PUT/DELETE
2. **Run sequentially** - Beberapa test depend on previous results
3. **Check console** - Debug info di Console tab
4. **Variables auto-saved** - IDs tersimpan otomatis untuk reuse

## 📚 Full Documentation

Lihat file lengkap untuk detail:
- **POSTMAN_TESTING_GUIDE.md** - Panduan lengkap testing
- **POSTMAN_TEST_TEMPLATES.md** - Template untuk custom tests

## 🐛 Troubleshooting

### Tests Failed?
1. ✅ Server running? `php artisan serve`
2. ✅ Database seeded? `php artisan db:seed`
3. ✅ Logged in? Run "Login" request first
4. ✅ Correct environment? Check top-right dropdown

### Token Not Saved?
- Check Console log: "Token saved: ..."
- Verify login response structure matches test expectations
- Check Collection Variables tab

### Image Upload Failed?
```bash
# Make sure storage is linked
php artisan storage:link

# Check storage permissions
chmod -R 775 storage/
```

## 🎉 Ready to Test!

Your API is ready for automated testing. Run the collection and watch all tests pass! ✅

---

**Questions?** Check the full documentation in POSTMAN_TESTING_GUIDE.md

**Happy Testing! 🚀**
