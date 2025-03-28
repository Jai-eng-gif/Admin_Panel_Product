import React, { useEffect, useState } from 'react';
import UpdateProduct from './UpdateProduct';

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null); // Store the product to be edited

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/products/", requestOptions);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE",
                redirect: "follow"
            });
            if (!response.ok) throw new Error(`Failed to delete product. Status: ${response.status}`);
            console.log("Product deleted successfully");
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // If editing, render UpdateProduct with selected product
    if (editProduct) {
        return <UpdateProduct product={editProduct} onUpdate={() => {
            setEditProduct(null); 
            fetchProducts();
        }} />;
    }

    if (products.length === 0) return <p>Loading...</p>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products.map((product) => (
                <ProductItem key={product._id} product={product} onDelete={deleteProduct} onEdit={setEditProduct} />
            ))}
        </div>
    );
};

const ProductItem = ({ product, onDelete, onEdit }) => {
    const [mainImage, setMainImage] = useState(`data:image/png;base64,${product.images[0]}`);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img className="p-8 rounded-t-lg w-80 h-80 object-contain" src={mainImage} alt={product.name} />

            <div className="flex justify-center space-x-2 mb-4">
                {product.images.map((image, idx) => (
                    <img
                        key={idx}
                        src={`data:image/png;base64,${image}`}
                        alt={`mini image ${idx + 1}`}
                        className="w-16 h-16 rounded-md cursor-pointer border border-gray-300 hover:border-lime-500"
                        onClick={() => setMainImage(`data:image/png;base64,${image}`)}
                    />
                ))}
            </div>

            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>

                    <div>
                        <button
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => onEdit(product)} // Pass product to edit
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => onDelete(product._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
