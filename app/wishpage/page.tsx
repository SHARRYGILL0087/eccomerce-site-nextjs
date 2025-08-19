'use client'
import React, { useContext } from 'react'
import { GlobalStates } from '../context/GlobalStates';
import Image from 'next/image';
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

const WishPage = () => {
    const states = useContext(GlobalStates)
    const [wishPro, setWishPro] = states.wishPros

    return (
        <div className='min-h-[80vh] py-5 px-4'>
            {!wishPro ? (
                <div>
                    No Cart
                </div>
            )
                :
                (
                    wishPro.map(item => {
                        return (
                            <Link key={item._id} href={`product/${item._id}`}>
                                <div className='py-4 w-full sm:h-[250px] flex sm:flex-row flex-col sm:gap-5 gap-6'>
                                    <Image
                                        width={210}
                                        height={210}
                                        className=' sm:w-[200px] w-full'
                                        src={item?.images} alt="hide" 
                                        />

                                    <div className='flex flex-col px-10 w-full'>
                                        <div className='flex justify-between '>
                                            <h2 className='font-semibold text-xl w-[80%]'>{item.name}</h2>
                                            <span className='font-bold tracking-wide font-sans text-xl'>${item.price}</span>
                                        </div>
                                        <span className="block text-green-800 my-2">In Stock</span>
                                        <p className=' font-semibold text-xs'>Eligible for FREE Shipping</p>
                                        <p className="font-medium text-sm">Brand : <span className='font-medium text-sm text-gray-600'>{item.brand}</span></p>

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

export default WishPage
