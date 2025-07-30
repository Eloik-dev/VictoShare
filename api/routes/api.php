<?php

use App\Http\Controllers\ShareController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/logout', [UserController::class, 'logout']);
    });

    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});

Route::group(['prefix' => 'resource'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/all', [ShareController::class, 'getAll']);
        Route::get('/history/{resourceId}', [ShareController::class, 'history']);
    });

    Route::get('/{token}', [ShareController::class, 'index']);
    Route::get('/access/{token}', [ShareController::class, 'access']);
    Route::post('/generate', [ShareController::class, 'generate']);
});

