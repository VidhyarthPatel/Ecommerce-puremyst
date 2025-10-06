import React from 'react'
import Products from './products'

function BestSelling() {
  return (
    <div className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='w-20 h-1 bg-blue-600 mx-auto mb-6'></div>
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4'>
            Best Selling Purifiers
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Engineered for purity and performance. Discover our top-rated water purification systems trusted by thousands.
          </p>
        </div>
        
        {/* Products Grid */}
        <Products/>
      </div>
    </div>
  )
}

export default BestSelling