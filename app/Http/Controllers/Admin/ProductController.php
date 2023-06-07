<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\{Product, User, Category};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/Index', [
            'data' => Product::with('category')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'status_options' => config('constants.status'),
            'categories' => Category::get()
        ]);
    }

    private function rules()
    {
        return $rules = [
            'title' => ['required'],
            'price' => ['required', 'numeric'],
            'category_id' => ['required','exists:categories,id'],
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = $this->rules();

        if($request->hasFile('file'))
        {
            $rules['file'] = ['image'];
        }

        $msg = [
            'category_id' => 'Please select category'
        ];

        Validator::make($request->all(),$rules, $msg)->validate();

        $data = [
            'title' => $request->title,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'status' => $request->status
        ];

        if($request->hasFile('file'))
        {
            $data['image'] = $this->fileUpload($request);
        }
   
        Product::create($data);
    
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
            'status_options' => config('constants.status'),
            'categories' => Category::select('id','title')->get(),
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'title' => $product->title,
                'slug' => $product->slug,
                'price' => $product->price,
                'image' => asset('uploads/'.$product->image),
                'status' => $product->status
            ]
        ]);
    }

    private function fileUpload($request) {
        $fileName = Str::slug($request->title).'-'.time().'.'.$request->file->extension();  
        $request->file->move(public_path('uploads'), $fileName);
        return $fileName;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $rules = $this->rules();

        if($request->hasFile('file'))
        {
            $rules['file'] = ['image'];
        }

        Validator::make($request->all(),$rules)->validate();

        $data = [
            'category_id' => $request->category_id,
            'title' => $request->title,
            'price' => $request->price,
            'status' => $request->status
        ];

        if($request->hasFile('file'))
        {
            $data['image'] = $this->fileUpload($request);
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
