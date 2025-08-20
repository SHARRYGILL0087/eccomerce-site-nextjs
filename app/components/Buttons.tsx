import Link from 'next/link'
import React from 'react'

const Buttons = () => {
  return (
    <div className='container w-[60vw] mx-auto my-4 flex gap-8 items-center justify-center'>
      <Link href='/' className='relative inline-block cursor-pointer group'>
      <span className=' hover:text-orange-400 text-gray-800 font-semibold text-sm transition-all duration-300'>HOME</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-orange-400 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
      <Link href='/' className='relative inline-block cursor-pointer group'>
      <span className=' hover:text-orange-400 text-gray-800 font-semibold text-sm transition-all duration-300'>CATEGORIES</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-orange-400 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
      <Link href='/' className='relative inline-block cursor-pointer group'>
      <span className=' hover:text-orange-400 text-gray-800 font-semibold text-sm transition-all duration-300'>{`MEN'S`}</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-orange-400 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
      <Link href='/' className='relative inline-block cursor-pointer group'>
      <span className=' hover:text-orange-400 text-gray-800 font-semibold text-sm transition-all duration-300'>{`WOMEN'S`}</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-orange-400 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
      <Link href='/' className='relative inline-block cursor-pointer group'>
      <span className=' hover:text-orange-400 text-gray-800 font-semibold text-sm transition-all duration-300'>KIDS</span>
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-orange-400 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
    </div>
  )
}

export default Buttons
