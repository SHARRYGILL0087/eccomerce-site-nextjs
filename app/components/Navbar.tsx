'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GlobalStates } from '../context/GlobalStates'

const Navbar = () => {
    const [searchText, setSearchText] = useState('')
    const states = useContext(GlobalStates)
    const [cartSize, setcartSize] = states.cartSize
    const [wishSize, setWishSize] = states.wishSize
    const [isLogin, setIsLogin] = states.isLogin
    const [showSrchBar, setshowSrchBar] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleLogout = () => {
        localStorage.removeItem('refreshtoken')
        setIsLogin(false)
    }

    const handleSearch = () => {
        console.log(searchText)
        setSearchText('')
    }

    return (
        <nav className='flex justify-between items-center container sm:mx-auto  gap-1.5 mx-1 my-4 w-[85vw] bg-white'>
            <Link href={'/'} className='font-extrabold tracking-wider'>
                Shopverse
            </Link>
            <div className='relative'>
                <input onChange={handleChange} type="text" value={searchText} placeholder='Search Product...' className='placeholder:text-gray-500 placeholder:text-sm outline-0 pl-3 py-1.5 border-2 border-orange-400 rounded-lg w-[50vw] focus:border-gray-700 text-gray-600 placeholder:w-[80%] sm:block hidden' />
                <Image
                    onClick={handleSearch}
                    src="/search.png"
                    alt="Logo"
                    width={25}
                    height={25}
                    className='cursor-pointer absolute right-2 top-2'
                />
            </div>
            <div className='sm:hidden block'>
                <Image
                    onClick={() => setshowSrchBar(!showSrchBar)}
                    src="/search.png"
                    alt="Logo"
                    width={25}
                    height={25}
                    className='cursor-pointer'
                />
            </div>
            <div className={`${showSrchBar ? 'block' : 'hidden'} w-full absolute z-50 bg-white h-[100px] pt-6 `}>
                <span onClick={()=> setshowSrchBar(false)} className='absolute right-3 font-bold cursor-pointer top-2'>x</span>
                <div className='relative'>
                    <input onChange={handleChange} type="text" value={searchText} placeholder='Search Product...' className='placeholder:text-gray-500 placeholder:text-sm outline-0 pl-3 py-1.5 border-2 border-orange-400 rounded-lg w-[90vw] focus:border-gray-700 text-gray-600 mx-2' />
                    <Image
                        onClick={handleSearch}
                        src="/search.png"
                        alt="Logo"
                        width={25}
                        height={25}
                        className='cursor-pointer absolute right-2 top-2'
                    />
                </div>
            </div>
            <div className='flex gap-4 items-center justify-center'>
                {isLogin ?
                    (<button onClick={handleLogout} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-orange-500 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Logout
                        </span>
                    </button>
                    )
                    :
                    (
                        <Link href={'/login'}>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-orange-500 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    Login
                                </span>
                            </button>
                        </Link>
                    )
                }
                {/* <Image
                    src="/profile.png"
                    alt="Logo"
                    width={23}
                    height={23}
                    className='cursor-pointer'
                /> */}
                <Link href={'/wishpage'} className='relative'>
                    <Image
                        src="/heart.png"
                        alt="Logo"
                        width={23}
                        height={23}
                        className='cursor-pointer '
                    />
                    {wishSize !== 0 && <span className='absolute top-[-13px] right-[-10px] bg-red-500 p-0.5 text-xs text-white rounded-full px-1.5'>{wishSize}</span>}
                </Link>
                <Link href={'/cartpage'} className='relative'>
                    <Image
                        src="/cart.png"
                        alt="Logo"
                        width={23}
                        height={23}
                        className='cursor-pointer'
                    />

                    {cartSize !== 0 && <span className='absolute top-[-13px] right-[-10px] bg-red-500 p-0.5 text-xs text-white rounded-full px-1.5'>{cartSize}</span>}

                </Link>
            </div>

        </nav>
    )
}

export default Navbar
