'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GlobalStates } from '@/app/context/GlobalStates'
import { toast } from 'react-toastify'

declare global {
    interface Window {
        Razorpay: any
    }
}

interface ProductProps {
    params: {
        slug: string
    }
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

export default function Product({ params }: ProductProps) {
    const states = useContext(GlobalStates)
    const [user, setUser] = states.user
    const router = useRouter()
    const [product, setProduct] = useState<ProductData | undefined>(undefined)
    const [refreshCart, setRefreshCart] = states.refreshCart
    const [refreshWish, setRefreshWish] = states.refreshWish
    const [isLogin, setIsLogin] = states.isLogin

    const { slug } = params

    // console.log('Prouser' , user?._id)

    const getProduct = async () => {
        try {
            const res = await axios.post('/api/products/get', { id: slug })
            // console.log(res.data)
            setProduct(res.data)

        } catch (error) {
            console.log('Err while getting product!', error)
        }
    }


    useEffect(() => {
        getProduct()
    }, [slug])

    const handleAddCart = async () => {
        try {
            const res = await axios.put('/api/products/addCart', { id: product?._id, ele: 'isCart' })
            // console.log(res.data)
            setRefreshCart(!refreshCart)
            toast('Product added to cart !', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            router.push('/cartpage')
        } catch (error: unknown) {
            if (error instanceof Error)
                console.log({ msg: 'Error while adding Cart' }, error)
            else
                console.log({ msg: 'Unknown error while adding cart' }, error)
        }
    }

    const handleAddWishList = async () => {
        try {
            const res = await axios.put('/api/products/addCart', { id: product?._id, ele: 'isWishList' })
            // console.log(res.data)
            toast('Product added to WishList !', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setRefreshWish(!refreshWish)
        } catch (error: unknown) {
            if (error instanceof Error)
                console.log({ msg: 'Error while adding Cart' }, error)
            else
                console.log({ msg: 'Unknown error while adding cart' }, error)
        }
    }

    const handlePayment = async () => {
        try {

            if (!isLogin) {
                router.push('/login')
                return;
            }

            if (typeof window.Razorpay === 'undefined') {
                alert('Payment system is loading, please try again in a moment');
                return;
            }


            const { data } = await axios.post("/api/payment", {
                amount: 500,
                currency: "INR",
            })


            const { order, key } = data

            // 2️⃣ Setup Razorpay options
            const options = {
                key: key, // only public key is exposed here
                amount: order.amount,
                currency: order.currency,
                name: "My Ecommerce Store",
                description: "Order Payment",
                order_id: order.id,
                handler: function (response: any) {
                    alert("Payment successful!");
                    console.log("Payment response:", response);

                    // Ideally send response to backend for verification
                    // axios.post("/api/verify-payment", response)
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            // 3️⃣ Open Razorpay Checkout
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Payment initiation failed:", err);
        }
    }




    return (
        <div className='min-h-screen flex items-center md:flex-row flex-col mt-1'>
            <div className='md:w-1/2 w-full h-full flex gap-1.5'>
                <div className='w-[20%]'></div>
                <div className='sm:w-[80%] w-full h-[94%] flex justify-center items-center'>
                    <Image
                        src={product?.images || "/placeholder.png"}
                        alt={product?.name || "Product Image"}
                        width={400}
                        height={400}
                        className='cursor-pointer object-contain max-h-[400px]  '
                    />
                </div>
            </div>
            <div className='md:w-1/2 w-full  h-full'>
                <div className='w-full px-4 py-3'>
                    <h2 className='font-medium text-2xl'>
                        {product?.name}
                    </h2>
                    <p className='font-bold text-xs my-2'>200+ bought in past month</p>
                    <hr />
                    <p className='space-x-1.5'><span className='text-2xl text-red-500 font-light'>-31%</span> <span className='text-2xl tracking-wider'>${product?.price}</span></p>
                    <p className='text-xs font-medium tracking-wide text-gray-500'>M.R.P.: <span className='line-through'>${product ? product.price + 1000 : 0}</span></p>
                    <p>Inclusive of all taxes</p>
                    <div className='border border-gray-500 w-full px-3.5 py-2.5 my-3 rounded-lg'>
                        <p className='space-x-1.5'><span className='text-2xl tracking-wider font-semibold font-mono'>${product?.price}</span></p>
                        <span className='block text-gray-700'>Free Delivery</span>
                        <span className='block font-medium'>Or fastest delivery Tomorrow,</span>
                        <div>
                            <h3 className='text-xl text-green-800 font-semibold'>In stock</h3>
                            <div>
                                <p className='space-x-5 text-sm'><span className='font-medium text-gray-500'>Ships from</span><span className='font-medium'>ShopVerse</span></p>
                                <p className='space-x-5 text-sm'><span className='font-medium text-gray-500'>Brand</span><span className='font-medium'>{product?.brand}</span></p>
                                <p className='space-x-5 text-sm'><span className='font-medium text-gray-500'>Payment</span><span className='font-medium'>Secure Transaction</span></p>
                            </div>
                            <select className='border border-gray-700 hover:bg-slate-100 cursor-pointer my-1.5 rounded-sm focus:outline-none px-2.5 py-0.5 w-fit' name="Quantity" >
                                <option value="1">Quantity : 1</option>
                                <option value="2">Quantity : 2</option>
                                <option value="3">Quantity : 3</option>
                                <option value="4">Quantity : 4</option>
                                <option value="5">Quantity : 5</option>
                                <option value="6">Quantity : 6</option>
                            </select>

                            <button onClick={handleAddWishList} className={`w-fit px-2.5 py-0.5 mt-1.5 border border-gray-700 rounded-sm block cursor-pointer hover:bg-slate-100 `}>Add to wish list</button>

                            <div className='flex flex-col gap-3 w-full mt-4'>
                                <button onClick={handleAddCart} className='bg-yellow-400 px-5 py-1.5 rounded-2xl cursor-pointer w-1/2 font-medium text-lg'>Add to Cart</button>
                                <button onClick={handlePayment} className='bg-orange-400 px-5 py-1.5 rounded-2xl cursor-pointer w-1/2 font-medium text-lg'>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
