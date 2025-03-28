import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
          <nav>
        <div className="flex justify-between items-center p-4 bg-gray-700 text-white w-full"> 
          <div>
            <Link to='/'>
            Ecommerce
            </Link>
          </div>
          <div>
          <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">



          <Link to='/addproduct'>
          Add Product
          
          </Link>
          </button>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar