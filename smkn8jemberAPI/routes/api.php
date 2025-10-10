<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnnouncementsController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChanceCarrierController;
use App\Http\Controllers\Api\ExtracurricularController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\MajorsController;
use App\Http\Controllers\Api\PartnersController;
use App\Http\Controllers\Api\SchoolDataController;
use App\Http\Controllers\Api\SchoolSettingsController;
use App\Http\Controllers\Api\SubjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ----------------------------------
// ---------- AUTH ROUTES ----------
//-----------------------------------
Route::prefix('auth')->middleware('web')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware(['auth:sanctum']);
});

Route::middleware('web')->group(function () {


    // ----------------------------------
    // ---------- CRUD ROUTES ----------
    //-----------------------------------
    Route::prefix('announcements')->group(function () {
        Route::get('/', [AnnouncementsController::class, 'index']);
        Route::get('/{id}', [AnnouncementsController::class, 'show']);
        Route::post('/', [AnnouncementsController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [AnnouncementsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [AnnouncementsController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('facility')->group(function () {
        Route::get('/', [FacilityController::class, 'index']);
        Route::get('/{id}', [FacilityController::class, 'show']);
        Route::post('/', [FacilityController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [FacilityController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [FacilityController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('majors')->group(function () {
        Route::get('/', [MajorsController::class, 'index']);
        Route::get('/{id}', [MajorsController::class, 'show']);
        Route::post('/', [MajorsController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [MajorsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [MajorsController::class, 'delete'])->middleware('auth:sanctum');
        Route::post('/{id}/restore', [MajorsController::class, 'restore'])->middleware('auth:sanctum');
    });

    Route::prefix('partners')->group(function () {
        Route::get('/', [PartnersController::class, 'index']);
        Route::get('/{id}', [PartnersController::class, 'show']);
        Route::post('/', [PartnersController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [PartnersController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [PartnersController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('extracurriculars')->group(function () {
        Route::get('/', [ExtracurricularController::class, 'index']);
        Route::get('/{id}', [ExtracurricularController::class, 'show']);
        Route::post('/', [ExtracurricularController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [ExtracurricularController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ExtracurricularController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('chance-carriers')->group(function () {
        Route::get('/', [ChanceCarrierController::class, 'index']);
        Route::get('/{id}', [ChanceCarrierController::class, 'show']);
        Route::post('/', [ChanceCarrierController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [ChanceCarrierController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ChanceCarrierController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('gallery')->group(function () {
        Route::get('/', [GalleryController::class, 'index']);
        Route::get('/{id}', [GalleryController::class, 'show']);
        Route::post('/', [GalleryController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [GalleryController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [GalleryController::class, 'delete'])->middleware('auth:sanctum');
    });

    Route::prefix('subject')->group(function () {
        Route::get('/', [SubjectsController::class, 'index']);
        Route::get('/{id}', [SubjectsController::class, 'show']);
        Route::post('/', [SubjectsController::class, 'create'])->middleware('auth:sanctum');
        Route::put('/{id}', [SubjectsController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [SubjectsController::class, 'delete'])->middleware('auth:sanctum');
    });


    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index']);
        Route::get('/{slug}', [ArticleController::class, 'show']);
        Route::post('/', [ArticleController::class, 'store'])->middleware('auth:sanctum');
        Route::put('/{id}', [ArticleController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/{id}', [ArticleController::class, 'delete'])->middleware('auth:sanctum');
    });




    // ----------------------------------
    // ---------- SUPERADMIN ROUTES ----------
    //-----------------------------------

    Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
        Route::prefix('admins')->group(function () {
            Route::get('/', [AdminController::class, 'index']);
            Route::get('/{id}', [AdminController::class, 'show']);
            Route::post('/', [AdminController::class, 'create']);
            Route::put('/{id}', [AdminController::class, 'update']);
            Route::delete('/{id}', [AdminController::class, 'delete']);
            Route::post('/{id}/restore', [AdminController::class, 'restore']);
        });

        Route::prefix('settings')->group(function () {
            Route::get('/', [SchoolSettingsController::class, 'index']);
            Route::put('/{title}', [SchoolSettingsController::class, 'update']);
        });
    });
});
