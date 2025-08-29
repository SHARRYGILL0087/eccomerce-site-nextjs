import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link';


interface ProductsRowProps {
    title?: string
}

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

const ProductsRow = ({ title }: ProductsRowProps) => {
    const [Pros, setPros] = useState<ProductData[]>([])

    const getPro = async () => {
        const res = await axios.post('http://localhost:3000/api/products/get', { category: title?.toLocaleLowerCase() })
        // console.log(res.data)
        setPros(res.data)
    }


    useEffect(() => {
        getPro()
    }, [])

    return (
        <div className='bg-white p-3 my-4'>
            <h1 className='font-semibold text-slate-800 my-5 text-2xl'>{title}</h1>
            <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-5'>

                {
                    Pros?.map((item: ProductData) => {
                        return (
                            <Link key={item._id}  href={`/product/${item?._id}`} className='flex flex-col items-center justify-center'>
                                <Image
                                    src={item.images}
                                    alt="Logo"
                                    width={150}
                                    height={150}
                                    className='cursor-pointer w-[150px] h-[150px]'
                                />
                                <h3 className='font-medium'>{item.name}</h3>
                                <span>From {item.price}</span>
                            </Link>
                        )
                    })
                }



            </div>

        </div>
    )
}

export default ProductsRow
