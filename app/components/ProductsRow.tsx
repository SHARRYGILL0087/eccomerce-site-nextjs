import React from 'react'
import Image from 'next/image'

const ProductsRow = () => {
    return (
        <div className='bg-white p-3 my-4'>
            <h1 className='font-semibold text-slate-800 my-3 text-xl'>HOME</h1>
            <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-5'>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro1.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro2.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro3.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro4.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro5.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro6.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro7.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Image
                        src="/proImgs/pro8.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className='cursor-pointer w-[150px] h-[150px]'
                    />
                    <h3 className='font-medium'>Water Bottles</h3>
                    <span>From $300</span>
                </div>
            </div>

        </div>
    )
}

export default ProductsRow
