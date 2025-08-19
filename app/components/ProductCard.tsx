'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';


interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string;
  stock: number;
  isCart: boolean;
  isWishList: boolean;
}

interface ProductCardProps{
  product : ProductData
}


const ProductCard = ({product} : ProductCardProps) => {


  return (
    <Link href={`/product/${product?._id}`} className='border border-gray-200 rounded-lg sm:w-[230px] w-full pb-4 my-2.5 cursor-pointer'>
      <Image
        src={product?.images || "/placeholder.png"}
        alt="off"
        width={300}
        height={200}
        className='cursor-pointer rounded-sm w-[230px] h-[240px]'
      />
      <div className='pl-2'>
        <span className='text-sm font-medium tracking-wide block text-gray-500'>{product?.name}</span>
        <span className='text-2xl font-black tracking-wide block'>${product?.price}</span>
        <span className='text-sm font-medium text-gray-600 tracking-wide block'>Free Delivery</span>
        <p className='text-sm font-medium text-gray-600 tracking-wide flex gap-5 items-center'>
          <span className='bg-green-700 text-white font-extrabold text-xl px-1 rounded-lg flex items-center w-fit my-1.5'>
            4.2
            <Image
              src="/star.svg"
              alt="off"
              width={15}
              height={15}
              className='cursor-pointer rounded-sm w-[15px] h-[15px]'
            />
          </span>
          <span>102020 Reviews</span>
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
