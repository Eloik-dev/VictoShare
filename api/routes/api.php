<?php

use App\Http\Controllers\ResourceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/**
 * Routes d'authentification
 */
Route::group(['prefix' => 'auth'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/logout', [UserController::class, 'logout']);
    });

    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});

/**
 * Routes de gestion des ressources
 */
Route::group(['prefix' => 'resource'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/all', [ResourceController::class, 'getAll']);
        Route::get('/history/{resourceId}', [ResourceController::class, 'history']);
    });

    Route::get('/{token}', [ResourceController::class, 'index']);
    Route::delete('/{token}', [ResourceController::class, 'delete']);
    Route::get('/access/{token}', [ResourceController::class, 'access']);
    Route::post('/generate', [ResourceController::class, 'generate']);
});

