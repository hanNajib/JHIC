# 🧪 Postman Test Scripts Template

## Template untuk setiap jenis endpoint

### 1. GET All (List) Template
```javascript
// Test status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response time
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(3000);
});

// Test response structure
pm.test("Response has data array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData.data).to.be.an('array');
});

// Test data structure if data exists
pm.test("Data items have required fields", function () {
    var jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        var item = jsonData.data[0];
        pm.expect(item).to.have.property('id');
        pm.expect(item).to.have.property('name'); // Sesuaikan field
        // Save first ID for detail test
        pm.collectionVariables.set("resource_id", item.id);
    }
});
```

### 2. GET Single (Detail) Template
```javascript
// Test status code (200 or 404)
pm.test("Status code is 200 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 404]);
});

// If found, test structure
if (pm.response.code === 200) {
    pm.test("Response contains item data", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('success');
        pm.expect(jsonData).to.have.property('data');
        pm.expect(jsonData.data).to.have.property('id');
        pm.expect(jsonData.data).to.have.property('name');
        // Add more fields as needed
    });
    
    // Test image URL format
    pm.test("Image URL is valid", function () {
        var jsonData = pm.response.json();
        if (jsonData.data.image) {
            pm.expect(jsonData.data.image).to.include('http');
            pm.expect(jsonData.data.image).to.include('storage');
        }
    });
}

// If not found, test error message
if (pm.response.code === 404) {
    pm.test("Not found message is present", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('success');
        pm.expect(jsonData.success).to.be.false;
    });
}
```

### 3. POST (Create) Template
```javascript
// Test status code
pm.test("Status code is 201 or 200", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

// Test response structure
pm.test("Response contains created data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData).to.have.property('message');
    pm.expect(jsonData.success).to.be.true;
});

// Test created data has ID
pm.test("Created item has ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('id');
    pm.expect(jsonData.data.id).to.be.a('number');
    // Save ID for update/delete
    pm.collectionVariables.set("created_resource_id", jsonData.data.id);
});

// Test data matches input
pm.test("Created data matches input", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.name).to.equal("Expected Name");
    // Add more field checks
});

// Test image was uploaded
pm.test("Image was uploaded successfully", function () {
    var jsonData = pm.response.json();
    if (jsonData.data.image) {
        pm.expect(jsonData.data.image).to.be.a('string');
        pm.expect(jsonData.data.image).to.not.be.empty;
    }
});

// Test authentication required
pm.test("Request requires authentication", function () {
    pm.expect(pm.response.code).to.not.equal(401);
});
```

### 4. PUT (Update) Template
```javascript
// Test status code
pm.test("Status code is 200 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 404]);
});

if (pm.response.code === 200) {
    // Test response structure
    pm.test("Response contains updated data", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('success');
        pm.expect(jsonData).to.have.property('data');
        pm.expect(jsonData).to.have.property('message');
        pm.expect(jsonData.success).to.be.true;
    });
    
    // Test updated data
    pm.test("Data was updated successfully", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.data.name).to.equal("Updated Name");
        // Add more field checks
    });
    
    // Test image handling
    pm.test("Old image was deleted and new image uploaded", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.data).to.have.property('image');
        if (jsonData.data.image) {
            pm.expect(jsonData.data.image).to.not.include('tmp');
            pm.expect(jsonData.data.image).to.include('storage');
        }
    });
}

// Test authentication
pm.test("Authentication is required", function () {
    pm.expect(pm.response.code).to.not.equal(401);
});
```

### 5. DELETE Template
```javascript
// Test status code
pm.test("Status code is 200 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 404]);
});

if (pm.response.code === 200) {
    // Test response structure
    pm.test("Response confirms deletion", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('success');
        pm.expect(jsonData).to.have.property('message');
        pm.expect(jsonData.success).to.be.true;
    });
    
    // Test deletion message
    pm.test("Deletion message is present", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.message).to.include('deleted');
    });
}

// Test authentication
pm.test("Authentication is required", function () {
    pm.expect(pm.response.code).to.not.equal(401);
});
```

## Advanced Testing Patterns

### 1. Pagination Testing
```javascript
pm.test("Pagination data is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('meta');
    pm.expect(jsonData.meta).to.have.property('current_page');
    pm.expect(jsonData.meta).to.have.property('last_page');
    pm.expect(jsonData.meta).to.have.property('total');
});
```

### 2. Relationship Testing
```javascript
pm.test("Related data is included", function () {
    var jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        var item = jsonData.data[0];
        pm.expect(item).to.have.property('category');
        pm.expect(item.category).to.have.property('id');
        pm.expect(item.category).to.have.property('name');
    }
});
```

### 3. Validation Error Testing
```javascript
// Send invalid data first
pm.test("Validation errors are returned", function () {
    if (pm.response.code === 422) {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('errors');
        pm.expect(jsonData.errors).to.be.an('object');
    }
});
```

### 4. Array Field Testing (categories)
```javascript
pm.test("Categories are properly attached", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('categories');
    pm.expect(jsonData.data.categories).to.be.an('array');
    if (jsonData.data.categories.length > 0) {
        pm.expect(jsonData.data.categories[0]).to.have.property('id');
        pm.expect(jsonData.data.categories[0]).to.have.property('name');
    }
});
```

### 5. Timestamp Testing
```javascript
pm.test("Timestamps are present and valid", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('created_at');
    pm.expect(jsonData.data).to.have.property('updated_at');
    
    // Test ISO 8601 format
    var createdAt = new Date(jsonData.data.created_at);
    pm.expect(createdAt).to.be.a('date');
});
```

### 6. Soft Delete Testing
```javascript
pm.test("Soft deleted items not included by default", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function(item) {
        pm.expect(item).to.not.have.property('deleted_at');
        // Or deleted_at should be null
        if (item.deleted_at) {
            pm.expect(item.deleted_at).to.be.null;
        }
    });
});
```

## Pre-request Scripts

### 1. Dynamic Timestamp
```javascript
pm.collectionVariables.set("timestamp", new Date().getTime());
```

### 2. Generate Random Data
```javascript
pm.collectionVariables.set("random_name", "Test " + Math.floor(Math.random() * 10000));
pm.collectionVariables.set("random_email", "test" + Math.random().toString(36).substring(7) + "@example.com");
```

### 3. Check Token Exists
```javascript
var token = pm.collectionVariables.get("auth_token");
if (!token || token === "") {
    console.log("WARNING: No auth token found. Please login first!");
}
```

## Console Debugging

### Log Full Response
```javascript
console.log("Response:", JSON.stringify(pm.response.json(), null, 2));
```

### Log Specific Data
```javascript
var jsonData = pm.response.json();
console.log("ID:", jsonData.data.id);
console.log("Name:", jsonData.data.name);
```

### Log Variables
```javascript
console.log("Token:", pm.collectionVariables.get("auth_token"));
console.log("Base URL:", pm.collectionVariables.get("base_url"));
```

## Chain Requests

### Save ID from Create for Update
```javascript
// In Create request
if (pm.response.code === 201) {
    pm.collectionVariables.set("last_created_id", pm.response.json().data.id);
}

// In Update request URL: {{base_url}}/resource/{{last_created_id}}
```

## Error Handling

### Graceful Failure
```javascript
try {
    pm.test("Response is valid JSON", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('object');
    });
} catch (e) {
    console.log("Failed to parse JSON:", e);
    pm.test("Response is JSON", function () {
        pm.expect.fail("Response is not valid JSON");
    });
}
```

## Performance Testing

### Response Time Tiers
```javascript
if (pm.response.responseTime < 200) {
    pm.test("⚡ Response time is excellent (< 200ms)", function () {
        pm.expect(pm.response.responseTime).to.be.below(200);
    });
} else if (pm.response.responseTime < 1000) {
    pm.test("✅ Response time is good (< 1000ms)", function () {
        pm.expect(pm.response.responseTime).to.be.below(1000);
    });
} else if (pm.response.responseTime < 3000) {
    pm.test("⚠️ Response time is acceptable (< 3000ms)", function () {
        pm.expect(pm.response.responseTime).to.be.below(3000);
    });
} else {
    pm.test("❌ Response time is too slow (> 3000ms)", function () {
        pm.expect(pm.response.responseTime).to.be.below(3000);
    });
}
```

## Usage Tips

1. **Copy & Paste**: Salin template yang sesuai ke tab "Tests" di request Postman
2. **Customize**: Sesuaikan field names dengan resource Anda
3. **Run**: Execute request dan lihat hasil test
4. **Iterate**: Tambah atau modifikasi test sesuai kebutuhan

---

**Happy Testing! 🚀**
