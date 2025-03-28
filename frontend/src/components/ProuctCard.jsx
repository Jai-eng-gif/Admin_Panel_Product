import React, { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_IP}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    console.log("delete clicked");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/${id}`, {
        method: "DELETE",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product. Status: ${response.status}`);
      }

      console.log("Product deleted successfully");
      fetchProducts();
      toast.success("Product deleted successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (editProduct) {
    return (
      <UpdateProduct
        product={editProduct}
        onUpdate={() => {
          setEditProduct(null);
          fetchProducts();
        }}
      />
    );
  }

  if (products.length === 0) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {console.log("Product", products)}
        {products.map((product, index) => (
          <ProductItem
            key={product._id}
            product={product}
            onDelete={deleteProduct}
            onEdit={setEditProduct}
          />
        ))}
      </div>
    </>
  );
};

const ProductItem = ({ product, onDelete, onEdit }) => {
  const [mainImage, setMainImage] = useState(
    `data:image/png;base64,${product.images[0]}`
  );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg w-80 h-80 object-contain"
          src={mainImage}
          alt={product.name}
        />
      </a>

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
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <div>
          <button
  type="button"
  className="text-white bg-[#5A9889] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  onClick={() => onEdit(product)}
>
  Edit
</button>



            <button
              type="button"
              className="text-white bg-[#FF5A3C] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
