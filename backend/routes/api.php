<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


// I did it for testing purpose I don't want to be creating another controller for just login again
Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('test-assessment')->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user]);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/', function(){
    return "Backend Test assessment";
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products/low-stock', [ProductController::class, 'lowStock']);
    Route::apiResource('products', ProductController::class);
});

// POST /api/products → Create a product (fields: name, price, stock)
// GET /api/products → Get list of products
// PUT /api/products/{id} → Update product stock or price
// DELETE /api/products/{id} → Delete a product
// GET /api/products/low-stock → Return products with stock less than 5
