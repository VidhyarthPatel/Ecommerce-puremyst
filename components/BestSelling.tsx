import React from 'react'
import Products from './products'

function BestSelling() {
  return (
    <div className='pt-10'>
        <h1 className='mx-auto text-center font-semibold text-5xl text-[#154D71]'>Best Selling Purifiers</h1>
        <p className='mx-auto text-center text-gray-600 mt-4 mb-10'>Discover our top-rated purifiers that combine advanced technology with sleek design to provide you with the cleanest air possible.</p>
        <Products/>
    </div>
  )
}

export default BestSelling