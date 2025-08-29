import Link from 'next/link'
import React from 'react'

const Buttons = () => {
  return (
    <div className='container w-full mx-auto my-4 flex items-center justify-start sm:justify-center gap-3 sm:gap-8 px-3 overflow-x-auto'>
      <Link href='/' className='relative inline-block cursor-pointer group flex-shrink-0'>
        <span className='hover:text-orange-400 text-gray-800 font-semibold text-xs sm:text-sm md:text-base transition-all duration-300'>HOME</span>
      
      </Link>
      <Link href='/productspage/electronics' className='relative inline-block cursor-pointer group flex-shrink-0'>
        <span className='hover:text-orange-400 text-gray-800 font-semibold text-xs sm:text-sm md:text-base  transition-all duration-300'>ELECTRONICS</span>
        
      </Link>
      <Link href='/productspage/men' className='relative inline-block cursor-pointer group flex-shrink-0'>
        <span className='hover:text-orange-400 text-gray-800 font-semibold text-xs sm:text-sm md:text-base transition-all duration-300'>{`MEN'S`}</span>
        
      </Link>
      <Link href='/productspage/women' className='relative inline-block cursor-pointer group flex-shrink-0'>
        <span className='hover:text-orange-400 text-gray-800 font-semibold text-xs sm:text-sm md:text-base transition-all duration-300'>{`WOMEN'S`}</span>
       
      </Link>
      <Link href='/productspage/kids' className='relative inline-block cursor-pointer group flex-shrink-0'>
        <span className='hover:text-orange-400 text-gray-800 font-semibold text-xs sm:text-sm md:text-base transition-all duration-300'>KIDS</span>
        
      </Link>
    </div>
  )
}

export default Buttons
