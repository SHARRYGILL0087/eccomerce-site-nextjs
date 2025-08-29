'use client'
import React, { useContext } from 'react'
import { GlobalStates } from '../context/GlobalStates';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';


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
    const [refreshWish, setRefreshWish] = states.refreshWish

    const handleRemoveCart = async (e: any, id: string) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling
        try {
            const res = await axios.put('/api/products/removeCart', { id: id, ele: 'isWishList' })
            console.log(res.data)
            if (res.data.msg === 'Product removed from cart') {
                setRefreshWish(!refreshWish)
            }
        } catch (error) {
            console.log('Err while removing cart product', error)
        }
    }

    return (
        <div className='min-h-[80vh] py-5 px-4'>
            <h1 className='my-6 mr-2 font-bold tracking-wider text-3xl'>Wishlist</h1>
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
                                        <div className='flex gap-3 items-center text-xl w-fit border-2 border-amber-300 rounded-2xl px-4 py-3 mt-5 '>
                                            <span >
                                                <Image
                                                    onClick={(e) => handleRemoveCart(e, item._id)}
                                                    width={20}
                                                    height={15}
                                                    className='cursor-pointer'
                                                    src='/delete.png' alt="hide" />
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

export default WishPage
