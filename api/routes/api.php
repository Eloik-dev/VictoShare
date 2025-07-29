<?php

use App\Http\Controllers\ShareController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'auth'], function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/login', [UserController::class, 'login']);
    Route::get('/register', [UserController::class, 'register']);
    Route::get('/logout', [UserController::class, 'logout']);
});

Route::group(['prefix' => 'resource'], function () {
    Route::get('/{token}', [ShareController::class, 'index']);
    Route::get('/access/{token}', [ShareController::class, 'access']);
    Route::post('/generate', [ShareController::class, 'generate']);
});

