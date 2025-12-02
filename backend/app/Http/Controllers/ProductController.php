<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function index(){
        // return all product
        return ProductResource::collection(Product::all());
    }

    public function store(StoreProductRequest $request){
        // product creation
        $product = Product::create($request->validated());
        return new ProductResource($product);
    }

    public function show(Product $product){
        // showcasing of product
        return new ProductResource($product);
    }

    public function update(UpdateProductRequest $request, Product $product){
        $product->update($request->validated());
        return new ProductResource($product);
    }

    public function destroy(Product $product){
        $product->delete();
        return response()->json([
            'message' => "Product Successfully Deleted"
        ]);
    }

    public function lowStock(){
        return ProductResource::collection(Product::lowStock()->get());
    }

}
