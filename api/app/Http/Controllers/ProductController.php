<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $products = Product::latest()->paginate(5);

        return response()->json($products->items());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): JsonResponse
    {
        return response()->json(['message' => 'Method not allowed'], 405);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // $request->validate([
        //     'name' => 'required',
        //     'detail' => 'required',
        // ]);

        // $product = Product::create($request->all());

        // return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);


        // Check if the user has the 'user-create' permission
        if ($request->user()->hasPermissionTo('product-create')) {
            $request->validate([
                'name' => 'required',
                'detail' => 'required',
            ]);
    
            $product = Product::create($request->all());
    
            return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    
        } else {
            // Return a response indicating that the user doesn't have permission
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): JsonResponse
    {
        return response()->json(['message' => 'Method not allowed'], 405);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        // $request->validate([
        //     'name' => 'required',
        //     'detail' => 'required',
        // ]);

        // $product->update($request->all());

        // return response()->json(['message' => 'Product updated successfully', 'product' => $product]);

        if ($request->user()->hasPermissionTo('product-edit')) {
            $request->validate([
                'name' => 'required',
                'detail' => 'required',
            ]);
    
            $product->update($request->all());
    
            return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Product $product): JsonResponse
    {
        // $product->delete();

        // return response()->json(['message' => 'Product deleted successfully']);

        if ($request->user()->hasPermissionTo('product-delete')) {
            $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
           
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
