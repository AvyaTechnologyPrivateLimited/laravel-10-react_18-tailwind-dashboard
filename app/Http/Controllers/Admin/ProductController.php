<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\{Product, User};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/Index', [
            'data' => Product::get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required']
        ])->validate();
   
        Product::create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'price' => $request->price,
            'status' => $request->status?$request->status:'Active'
        ]);
    
        return redirect()->route('admin.product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Product/Edit', [
            'product' => [
                'id' => $product->id,
                'price' => $product->price,
                'title' => $product->title,
                'status' => $product->status,
                'image' => $product->image
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        Validator::make($request->all(), [
            'title' => ['required']
        ])->validate();

        $fileName = time().'.'.$request->file->extension();  
        $request->file->move(public_path('uploads'), $fileName);
            
        $data = [
            'title' => $request->title,
            'price' => $request->price,
        ];

        if($request->filled('status'))
        {
            $data['status'] = $request->status;
        }

        $product->update($data);
    
        return redirect()->route('admin.product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::back()->with('success', 'Product deleted.');
    }
}
