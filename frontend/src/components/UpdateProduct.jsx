import { useState, useRef } from 'react';

const UpdateProduct = ({ product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const fileInputRefs = useRef({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedImageBase64 = await convertToBase64(file);
      setUpdatedProduct(prev => ({
        ...prev,
        images: prev.images.map((img, index) =>
          index === id ? uploadedImageBase64 : img
        ),
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result.split(',')[1]); // Extract base64 content
      reader.readAsDataURL(file);
    });
  };

  const triggerFileInput = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  const addImageSlot = () => {
    setUpdatedProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/${product._id}/image/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setUpdatedProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== id),
      }));

      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: updatedProduct.name,
        price: updatedProduct.price,
        images: updatedProduct.images.filter((img) => img),
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update product');

      console.log('Product updated successfully');
      onUpdate();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sku</label>
            <input
              type="text"
              name="sku"
              value={updatedProduct.sku}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Product Images</h2>
              <button
                type="button"
                onClick={addImageSlot}
                className="px-3 py-1 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {updatedProduct.images.map((image, index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    ref={el => (fileInputRefs.current[index] = el)}
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                  />

                  <div
                    onClick={() => triggerFileInput(index)}
                    className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed cursor-pointer"
                  >
                    {image ? (
                      <img src={`data:image/png;base64,${image}`} alt={`Image ${index}`} className="object-contain h-full w-full" />
                    ) : (
                      <span>Click to upload</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
              onClick={onUpdate}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
