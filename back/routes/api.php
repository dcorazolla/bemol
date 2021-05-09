<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware("api")
    ->group(function($router){

        Route::post('/login', [AuthController::class, 'login']);
        
        Route::middleware("auth:api")
        ->group(function(){

            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);

            // Route::resource('user', UserController::class);

            Route::get("/user", [UserController::class, 'index']);
            Route::get("/user/{id}", [UserController::class, 'show']);
            Route::post('/user', [UserController::class, 'store']);
            Route::put('/user', [UserController::class, 'update']);
            Route::delete('/user/{id}', [UserController::class, 'destroy']);

        });

});