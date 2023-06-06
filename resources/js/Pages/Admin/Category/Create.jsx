import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Select from 'react-select'

export default function Create({ auth, status_options }) {

    const { data, setData, post, errors, progress } = useForm({
        title: "",
        status: "",
        file: "",
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData('file', file);
    };

    const handleOptionChange = (option) => {
        setData('status', option.target.status);
    };
  
    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        post(route("admin.category.store"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the Content-Type header
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Category</h2>}
        >
            <Head title="Create Category" />
           
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            
                            <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Title
                                </label>
                                <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="title" 
                                    type="text" 
                                    placeholder="Titel"
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
                                    Icon
                                </label>
                                <input 
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    type="file"
                                    placeholder="Icon"
                                    name="file"
                                    id="file"
                                    onChange={handleFileChange}
                                />
                               
                                <span className="text-red-600">
                                    {errors.file}
                                </span>
                                </div>
                                <div className="mb-4">
                                
                                <select
                                name="status"
                                id="status"
                                onChange={handleOptionChange}
                                >
                                    <option value="Md">Asif</option>
                                    <option value="Anand">Bhatt</option>
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
                                    Save
                                </button>
                                </div>
                            </form>
                    
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
