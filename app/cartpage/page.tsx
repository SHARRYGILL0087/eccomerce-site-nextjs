'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import getCart from '../data/getCart'
import { GlobalStates } from '../context/GlobalStates'
import Link from 'next/link'

const CartPage = () => {
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

  const states = useContext(GlobalStates)
  const [cartPro, setCartPro] = states.cartPros




  const [quant, setQuant] = useState(0)

  // console.log('ssss' , cartPro)


  return (
    <div className='min-h-[80vh] py-5 px-4'>
      <h1 className='my-6 mr-2 font-bold tracking-wider text-3xl'>My Cart</h1>
      {!cartPro ? (
        <div>
          No Cart
        </div>
      )
        :
        (
          cartPro.map(item => {
            return (
              <Link key={item._id} href={`/product/${item._id}`} >
                <div className='py-4 w-full sm:h-[250px] flex sm:flex-row flex-col sm:gap-5 gap-6'>
                  <div>
                    <Image
                      width={210}
                      height={210}
                      className='sm:w-[200px] w-full'
                      src={item?.images} alt="hide" />
                  </div>

                  <div className='flex flex-col sm:px-10 px-3 w-full'>
                    <div className='flex justify-between '>
                      <h2 className='font-semibold text-xl w-[80%]'>{item.name}</h2>
                      <span className='font-bold tracking-wide font-sans text-xl'>${item.price}</span>
                    </div>
                    <span className="block text-green-800 my-2">In Stock</span>
                    <p className=' font-semibold text-xs'>Eligible for FREE Shipping</p>
                    <p className="font-medium text-sm">Brand : <span className='font-medium text-sm text-gray-600'>{item.brand}</span></p>
                    <div className='flex gap-3 items-center text-xl w-[100px] border-2 border-amber-300 rounded-2xl px-4 mt-5 '>
                      {quant === 0 ?
                        <span >
                          <Image
                            width={20}
                            height={15}
                            className='cursor-pointer'
                            src='/delete.png' alt="hide" />
                        </span>
                        :
                        <span
                          onClick={() => setQuant(quant - 1)}
                          className='cursor-pointer'
                        >
                          -
                        </span>
                      }
                      {quant}
                      <span
                        onClick={() => setQuant(quant + 1)}
                        className='cursor-pointer'
                      >+
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )
      }
    </div>
  )
}

export default CartPage
