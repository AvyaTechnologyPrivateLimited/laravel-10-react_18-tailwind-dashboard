import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {

    const { data, setData, errors, post } = useForm({
        title: "",
        status: "",
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.product.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Product</h2>}
        >
            <Head title="Create Product" />

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
                                    Image
                                </label>
                                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="Icon" />
                                </div>
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Status
                                </label>
                                <select onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    id="status"
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="status" name="status">
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>
                                <span className="text-red-600">
                                    {errors.status}
                                </span>
                                </div>
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
