import mongoose from "mongoose";


const productSchema=mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      images: {
        type: [String], 
        validate: [arrayLimit, 'At least one image is required.'],
      },
},{timestamps:true});

function arrayLimit(val) {
    return val.length > 0; 
  }

export const Product=mongoose.model('Product',productSchema);