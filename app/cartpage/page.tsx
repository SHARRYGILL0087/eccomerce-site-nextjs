'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { GlobalStates } from '../context/GlobalStates'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: any
  }
}



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
  const router = useRouter()
  const [cartPro, setCartPro] = states.cartPros
  const [refreshCart, setRefreshCart] = states.refreshCart
  const [isLogin, setIsLogin] = states.isLogin




  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    if (cartPro && Array.isArray(cartPro)) {
      const initial: Record<string, number> = {}
      cartPro.forEach((item, index) => {
        initial[item._id] = (index % 3) + 1
      })
      setQuantities(initial)
    }
  }, [cartPro])

  // console.log('ssss' , cartPro)

  const handleRemoveCart = async (e: any, id: string) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event bubbling
    try {
      const res = await axios.put('/api/products/removeCart', { id: id, ele: 'isCart' })
      console.log(res.data)
      if (res.data.msg === 'Product removed from cart') {
        setRefreshCart(!refreshCart)
      }
    } catch (error) {
      console.log('Err while removing cart product', error)
    }
  }


  // totals
  const items = Array.isArray(cartPro) ? cartPro : []
  const totalQuantity = items.reduce((sum, item) => sum + (quantities[item._id] ?? 1), 0)
  const subTotal = items.reduce((sum, item) => sum + item.price * (quantities[item._id] ?? 1), 0)
  const tax = +(subTotal * 0.05).toFixed(2)
  const shipping = subTotal > 0 ? 0 : 0
  const grandTotal = +(subTotal + tax + shipping).toFixed(2)


  const handlePayment = async () => {
    try {

      if(!isLogin){
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
    <div className='min-h-[80vh] py-5 px-4'>
      <h1 className='my-6 mr-2 font-bold tracking-wider text-3xl'>My Cart</h1>

      <div className='w-full flex flex-col md:flex-row md:gap-6 gap-2'>
        <div className='flex-1'>
          {!cartPro ? (
            <div>
              No Cart
            </div>
          ) : (
            items.map(item => {
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
                        {(quantities[item._id] ?? 0) === 0 ?
                          <span >
                            <Image
                              onClick={(e) => handleRemoveCart(e, item._id)}
                              width={20}
                              height={15}
                              className='cursor-pointer'
                              src='/delete.png' alt="hide" />
                          </span>
                          :
                          <span
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantities(prev => ({ ...prev, [item._id]: Math.max(0, (prev[item._id] ?? 0) - 1) })); }}
                            className='cursor-pointer'
                          >
                            -
                          </span>
                        }
                        {quantities[item._id] ?? 0}
                        <span
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantities(prev => ({ ...prev, [item._id]: (prev[item._id] ?? 0) + 1 })); }}
                          className='cursor-pointer'
                        >+
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>

        <div className='md:w-[380px] w-full hidden md:block'>
          <div className='border rounded-xl p-5 sticky top-24 bg-white shadow-sm'>
            <h3 className='font-semibold text-xl mb-4'>Order Summary</h3>
            <div className='flex justify-between text-sm mb-2'>
              <span>Items ({totalQuantity})</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-sm mb-2'>
              <span>Estimated Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-sm mb-4'>
              <span>Delivery</span>
              <span className='text-green-700 font-medium'>Free</span>
            </div>
            <div className='border-t pt-3 flex justify-between font-semibold text-lg'>
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={grandTotal === 0}
              className={`mt-5 w-full py-3 rounded-lg text-white font-semibold ${grandTotal === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer'}`}
            >
              Pay ${grandTotal.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      <div className='md:hidden'>
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-[0_-6px_20px_rgba(0,0,0,0.08)]'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500'>Total ({totalQuantity} items)</span>
              <span className='font-bold text-lg'>${grandTotal.toFixed(2)}</span>
            </div>
            <button
            onClick={handlePayment}
              disabled={grandTotal === 0}
              className={`px-5 py-3 rounded-lg  text-white font-semibold ${grandTotal === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer'}`}
            >
              Pay
            </button>
          </div>
          <div className='flex justify-between text-xs text-gray-600 mt-2'>
            <span>Tax: ${tax.toFixed(2)}</span>
            <span>Delivery: Free</span>
          </div>
        </div>
        <div className='h-24' />
      </div>
    </div>
  )
}

export default CartPage
