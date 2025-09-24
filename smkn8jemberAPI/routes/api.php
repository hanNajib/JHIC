<?php

use App\Http\Controllers\Api\AnnouncementsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChanceCarrierController;
use App\Http\Controllers\Api\ExtracurricularController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\MajorsController;
use App\Http\Controllers\Api\PartnersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ----------------------------------
// ---------- AUTH ROUTES ----------
//-----------------------------------
Route::prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware(['auth:sanctum']);
});



// ----------------------------------
// ---------- CRUD ROUTES ----------
//-----------------------------------
Route::prefix('announcements')->group(function() {
    Route::get('/', [AnnouncementsController::class, 'index']);
    Route::get('/{id}', [AnnouncementsController::class, 'show']);
    Route::post('/', [AnnouncementsController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [AnnouncementsController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AnnouncementsController::class, 'delete'])->middleware('auth:sanctum');
});

Route::prefix('facility')->group(function() {
    Route::get('/', [FacilityController::class, 'index']);
    Route::get('/{id}', [FacilityController::class, 'show']);
    Route::post('/', [FacilityController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [FacilityController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [FacilityController::class, 'delete'])->middleware('auth:sanctum');
});

Route::prefix('majors')->group(function() {
    Route::get('/', [MajorsController::class, 'index']);
    Route::get('/{id}', [MajorsController::class, 'show']);
    Route::post('/', [MajorsController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [MajorsController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [MajorsController::class, 'delete'])->middleware('auth:sanctum');
});

Route::prefix('partners')->group(function() {
    Route::get('/', [PartnersController::class, 'index']);
    Route::get('/{id}', [PartnersController::class, 'show']);
    Route::post('/', [PartnersController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [PartnersController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [PartnersController::class, 'delete'])->middleware('auth:sanctum');
});

Route::prefix('extracurriculars')->group(function() {
    Route::get('/', [ExtracurricularController::class, 'index']);
    Route::get('/{id}', [ExtracurricularController::class, 'show']);
    Route::post('/', [ExtracurricularController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [ExtracurricularController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [ExtracurricularController::class, 'delete'])->middleware('auth:sanctum');
});

Route::prefix('chance-carriers')->group(function() {
    Route::get('/', [ChanceCarrierController::class, 'index']);
    Route::get('/{id}', [ChanceCarrierController::class, 'show']);
    Route::post('/', [ChanceCarrierController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/{id}', [ChanceCarrierController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [ChanceCarrierController::class, 'delete'])->middleware('auth:sanctum');
});

// Route::prefix()