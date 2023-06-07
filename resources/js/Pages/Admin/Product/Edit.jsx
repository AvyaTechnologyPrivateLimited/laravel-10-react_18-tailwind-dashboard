import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Edit({ auth, status_options, categories }) {
    

    const { product } = usePage().props;
    const { data, setData, post, errors, progress } = useForm({
        category_id: product.category_id,
        title: product.title || "",
        price: product.price || "",
        status: product.status,
        image: product.image || "",
        file: "",
    });

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setData('status', value);
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setData('category_id', value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData('file', file);
      };

    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        post(route("admin.product.update", product.id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the Content-Type header
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            
                            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Category
                                </label>
                                <select
                                onChange={handleCategoryChange}
                                value={data.category_id}
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="category_id"
                                id="category_id"
                                
                                
                                >
                                    <option key="0" value="">Select</option>
                                {categories.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.title}
                                    </option>
                                ))}
                                </select>
                                <span className="text-red-600">
                                    {errors.category_id}
                                </span>
                                </div>
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Title
                                </label>
                                <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="title" 
                                    type="text" 
                                    placeholder="Title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.title}
                                </span>
                                </div>
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image
                                </label>
                                <input 
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    type="file"
                                    placeholder="Image"
                                    name="file"
                                    id="file"
                                    onChange={handleFileChange}
                                />
                                
                                <img src={data.image} width="40px" />
                                <span className="text-red-600">
                                    {errors.file}
                                </span>
                                </div>
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Price
                                </label>
                                <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="price" 
                                    type="text" 
                                    placeholder="Price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.title}
                                </span>
                                </div>
                                <div className="mb-4">
                                
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Status
                                </label>
                                <select 
                                    onChange={handleStatusChange}
                                    value={data.status}
                                    name="status"
                                    id="status"
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status" name="status">
                                    {status_options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <span className="text-red-600">
                                    {errors.status}
                                </span>
                                </div>

                                {progress && (
                                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Update
                                </button>
                                </div>
                            </form>
                    
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
