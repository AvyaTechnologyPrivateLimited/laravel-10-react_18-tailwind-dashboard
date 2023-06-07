<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
//use Storage;
use Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Category/Index', [
            'data' => Category::withCount('products')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Category/Create', [
            'status_options' => config('constants.status')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = ['title' => ['required']];

        if($request->hasFile('file'))
        {
            $rules['file'] = ['image'];
        }

        Validator::make($request->all(),$rules)->validate();

        $data = [
            'title' => $request->title,
            'status' => $request->status
        ];

        if($request->hasFile('file'))
        {
            $data['image'] = $this->fileUpload($request);
        }
   
        Category::create($data);
    
        return redirect()->route('admin.category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Category/Edit', [
            'status_options' => config('constants.status'),
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'status' => $category->status,
                'image' => $category->image
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $rules = ['title' => ['required']];

        if($request->hasFile('file'))
        {
            $rules['file'] = ['image'];
        }

        Validator::make($request->all(),$rules)->validate();

        $data = [
            'title' => $request->title,
            'status' => $request->status
        ];

        if($request->hasFile('file'))
        {
            $data['image'] = $this->fileUpload($request);
        }

        $category->update($data);
    
        return redirect()->route('admin.category.index');
    }

    private function fileUpload($request) {
        $fileName = Str::slug($request->title).'-'.time().'.'.$request->file->extension();  
        $request->file->move(public_path('uploads'), $fileName);
        return $fileName;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();
        return Redirect::back()->with('success', 'Category deleted.');
    }
}
