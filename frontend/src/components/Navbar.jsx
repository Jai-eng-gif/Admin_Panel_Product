import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
          <nav>
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white w-full"> 
          <div>
            <Link to='/'>
            Ecommerce
            </Link>
          </div>
          <div>
          <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <Link to='/addproduct'>
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