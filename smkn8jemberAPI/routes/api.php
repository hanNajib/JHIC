<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnnouncementsController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChanceCarrierController;
use App\Http\Controllers\Api\ExtracurricularController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\MajorsController;
use App\Http\Controllers\Api\PartnersController;
use App\Http\Controllers\Api\SchoolDataController;
use App\Http\Controllers\Api\SchoolSettingsController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\SubjectsController;
use App\Models\Facility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ----------------------------------
// ---------- AUTH ROUTES ----------
//-----------------------------------
Route::prefix('auth')->middleware('web')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware(['auth:sanctum']);
    Route::put('update', [AuthController::class, 'update'])->middleware(['auth:sanctum']);
});

Route::middleware('web')->group(function () {

    Route::get('search', [SearchController::class, 'index']);
    // ----------------------------------
    // ---------- CRUD ROUTES ----------
    //-----------------------------------
    Route::prefix('announcements')->group(function () {
        Route::get('/', [AnnouncementsController::class, 'index']);
        Route::post('/', [AnnouncementsController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [AnnouncementsController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [AnnouncementsController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [AnnouncementsController::class, 'show']);
        Route::put('/{id}', [AnnouncementsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [AnnouncementsController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [AnnouncementsController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [AnnouncementsController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('facility')->group(function () {
        Route::get('/', [FacilityController::class, 'index']);
        Route::post('/', [FacilityController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [FacilityController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [FacilityController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [FacilityController::class, 'show']);
        Route::put('/{id}', [FacilityController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [FacilityController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [FacilityController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [FacilityController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('majors')->group(function () {
        Route::get('/', [MajorsController::class, 'index']);
        Route::post('/', [MajorsController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [MajorsController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [MajorsController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/shortname/{short_name}', [MajorsController::class, 'getByShortName']);
        Route::get('/{id}', [MajorsController::class, 'show']);
        Route::put('/{id}', [MajorsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [MajorsController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [MajorsController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [MajorsController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('partners')->group(function () {
        Route::get('/', [PartnersController::class, 'index']);
        Route::post('/', [PartnersController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [PartnersController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [PartnersController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [PartnersController::class, 'show']);
        Route::put('/{id}', [PartnersController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [PartnersController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [PartnersController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [PartnersController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('extracurriculars')->group(function () {
        Route::get('/', [ExtracurricularController::class, 'index']);
        Route::post('/', [ExtracurricularController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [ExtracurricularController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [ExtracurricularController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [ExtracurricularController::class, 'show']);
        Route::put('/{id}', [ExtracurricularController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ExtracurricularController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [ExtracurricularController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [ExtracurricularController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('chance-carriers')->group(function () {
        Route::get('/', [ChanceCarrierController::class, 'index']);
        Route::post('/', [ChanceCarrierController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [ChanceCarrierController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [ChanceCarrierController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [ChanceCarrierController::class, 'show']);
        Route::put('/{id}', [ChanceCarrierController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ChanceCarrierController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [ChanceCarrierController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [ChanceCarrierController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('gallery')->group(function () {
        Route::get('/', [GalleryController::class, 'index']);
        Route::post('/', [GalleryController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [GalleryController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [GalleryController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [GalleryController::class, 'show']);
        Route::put('/{id}', [GalleryController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [GalleryController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [GalleryController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [GalleryController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('subject')->group(function () {
        Route::get('/', [SubjectsController::class, 'index']);
        Route::post('/', [SubjectsController::class, 'create'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [SubjectsController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [SubjectsController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [SubjectsController::class, 'show']);
        Route::put('/{id}', [SubjectsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [SubjectsController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [SubjectsController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [SubjectsController::class, 'forceDelete'])->middleware('auth:sanctum');
    });


    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index']);
        Route::post('/', [ArticleController::class, 'store'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [ArticleController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [ArticleController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{slug}', [ArticleController::class, 'show']);
        Route::put('/{id}', [ArticleController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ArticleController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [ArticleController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [ArticleController::class, 'forceDelete'])->middleware('auth:sanctum');
        Route::patch('/{id}/status', [ArticleController::class, 'updateStatus'])->middleware('auth:sanctum', 'role:superadmin');
    });

    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store'])->middleware('auth:sanctum');
        Route::post('/restore-bulk', [CategoryController::class, 'bulkRestore'])->middleware('auth:sanctum');
        Route::post('/force-delete-bulk', [CategoryController::class, 'bulkForceDelete'])->middleware('auth:sanctum');
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [CategoryController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [CategoryController::class, 'restore'])->middleware('auth:sanctum');
        Route::delete('/{id}/force', [CategoryController::class, 'forceDelete'])->middleware('auth:sanctum');
    });

    Route::prefix('staff')->group(function () {
        Route::get('/', [StaffController::class, 'index']);
        Route::get('/structure', [StaffController::class, 'structure']);
        Route::get('/{id}', [StaffController::class, 'show']);

        Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
            Route::post('/', [StaffController::class, 'store']);
            Route::post('/restore-bulk', [StaffController::class, 'bulkRestore']);
            Route::post('/force-delete-bulk', [StaffController::class, 'bulkForceDelete']);
            Route::put('/{id}', [StaffController::class, 'update']);
            Route::delete('/{id}', [StaffController::class, 'delete']);
            Route::post('/{id}/restore', [StaffController::class, 'restore']);
            Route::delete('/{id}/force', [StaffController::class, 'forceDelete']);
        });
    });

    Route::prefix('settings')->group(function () {
        Route::get('/', [SchoolSettingsController::class, 'index']);
        Route::get('/{title}', [SchoolSettingsController::class, 'getByTitle']);
        Route::put('/{title}', [SchoolSettingsController::class, 'update'])->middleware(['auth:sanctum', 'role:superadmin']);
    });

    Route::prefix('school-data')->group(function () {
        Route::get('/', [SchoolDataController::class, 'index']);
        Route::get('/{name}', [SchoolDataController::class, 'show']);
        Route::put('/{name}', [SchoolDataController::class, 'update'])->middleware(['auth:sanctum', 'role:superadmin']);
    });
    // ----------------------------------
    // ---------- SUPERADMIN ROUTES ----------
    //-----------------------------------

    Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
        Route::prefix('admins')->group(function () {
            Route::get('/', [AdminController::class, 'index']);
            Route::post('/', [AdminController::class, 'create']);
            Route::post('/restore-bulk', [AdminController::class, 'bulkRestore']);
            Route::post('/force-delete-bulk', [AdminController::class, 'bulkForceDelete']);
            Route::get('/{id}', [AdminController::class, 'show']);
            Route::put('/{id}', [AdminController::class, 'update']);
            Route::delete('/{id}', [AdminController::class, 'delete']);
            Route::post('/{id}/restore', [AdminController::class, 'restore']);
            Route::delete('/{id}/force', [AdminController::class, 'forceDelete']);
        });
    });

   Route::get('admins/name/{name}', [AdminController::class, 'getByName']);


});
