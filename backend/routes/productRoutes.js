import { Router } from "express";
import multer from 'multer';
import { Product } from "../models/product.js";

const router = Router();

const storage = multer.memoryStorage()                                                       
const upload = multer({ storage });       

// Get all products
router.get('/', async (req, res) => {
    try {
        const product=await Product.find({})
        console.log("Product all get");
        
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });        
    }
})

// Add the product
router.post('/create',upload.array("images", 4),async (req, res) => {
    try {
        const {sku,name,price}=req.body
        console.log(sku,name,price);
        
        const images = req.files.map((file) => file.buffer.toString("base64"));
        const product=new Product({sku,name,price,images})
        const response= await product.save()
        res.status(201).json({ message: "Data saved", response });
        
    } catch (error) {
        res.status(400).json({ message: "Error saving data", error });                
    }
})

//  Update the product with all images                         
router.put('/:id',upload.array("images", 5),async (req, res) => {
    try {
        const productId=req.params.id
        const body= req.body
        let updatedData = { ...body }; // Copy other fields from request body
        if (req.files && req.files.length > 0) {
            updatedData.images = req.files.map((file) => file.buffer.toString("base64"));
          }
      
        const response= await Product.findByIdAndUpdate(productId,updatedData,{new:true})
        if (!response) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.status(200).json({ message: "Data updated", response });
        
    } catch (error) {
        res.status(500).json({ message: "Error updating data", error });    
        
    }
})


// Update a specific image by index
router.patch("/:id/image/:index", upload.single("images"), async (req, res) => {
    try {
      const { id: productId, index } = req.params;
      const imageIndex = parseInt(index, 10);
      if (isNaN(imageIndex) || imageIndex < 0) {
        return res.status(400).json({ message: "Invalid image index" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (imageIndex >= product.images.length) {
        return res.status(400).json({ message: "Image index out of bounds" });
      }
  
      product.images[imageIndex] = req.file.buffer.toString("base64");
  
      await product.save();
      res.status(200).json({ message: "Image updated successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error updating image", error });
    }
  });
  

// Delete the product
router.delete('/:id', async (req, res) => {
    try {
        const response=await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Data deleted", response });
        
    } catch (error) {
        res.status(404).json({ message: "Product not found", error });                
    }
})

// Delete a specific image by index
router.delete("/:id/image/:index", async (req, res) => {
    try {
      const { id: productId, index } = req.params;
  
      const imageIndex = parseInt(index, 10);
      if (isNaN(imageIndex) || imageIndex < 0) {
        return res.status(400).json({ message: "Invalid image index" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (imageIndex >= product.images.length) {
        return res.status(400).json({ message: "Image index out of bounds" });
      }
  
      product.images.splice(imageIndex, 1);
  
      await product.save();
      res.status(200).json({ message: "Image deleted successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
    }
  });
  

export default router;