import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProuctCard from "./components/ProuctCard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductCard from "./components/ProuctCard";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <div className="m-5" >
          
          <ProductCard  />

          
          </div>
        </>
      ),
    },
    {
      path: "/addproduct",
      element: (
        <>
          <Navbar />
          <AddProduct/>
        </>
      ),
    },
     
     
  ]);

  return (
    <>
       
    <RouterProvider router={router} />

    </>
  );
}

export default App;


