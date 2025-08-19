"use client"
import Link from 'next/link'
import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GlobalStates } from '../context/GlobalStates'

const SignUp = () => {
    const states = useContext(GlobalStates)
    const router = useRouter()
    const [dataForm, setDataForm] = useState({ firstname: '', lastname: '', email: '', password: '' })
    const [viewPass, setViewPass] = useState(false)
    const [isLogin, setIsLogin] = states.isLogin

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setDataForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const toggleView = () => {
        setViewPass(!viewPass)
    }

    const handleSubmit = async (e: React.InputEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/api/signin', dataForm)
            // console.log(res.data)
            localStorage.setItem("accesstoken",res.data.accesstoken)
            setIsLogin(true)
            setDataForm({ firstname: '', lastname: '', email: '', password: '' })
            router.push('/')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error while signup', error.message)
            } else {
                console.log('Unknown err while signup', error)
            }
        }
    }


    return (
        <div>
            <div className='h-[90vh] sm:bg-slate-900 bg-white flex items-center justify-center'>
                <div className='rounded-lg h-[580px] w-[600px] py-3 bg-white px-4'>
                    <h2 className='font-medium text-2xl mt-2'>Sign Up</h2>
                    <p className='text-md text-gray-600 py-1.5'>Welcome to ssgmart</p>
                    <form onSubmit={handleSubmit} className='mt-6 px-2 space-y-2'>

                        <label className='block text-xl'>First name</label>
                        <input onChange={handleChange} type="text" placeholder='Enter Your Name' name='firstname' value={dataForm.firstname} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-1.5 w-[100%] focus:border-orange-500' required />

                        <label className='block text-xl'>Last name</label>
                        <input onChange={handleChange} type="text" placeholder='Enter Your Name' name='lastname' value={dataForm.lastname} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-1.5 w-[100%] focus:border-orange-500' required />

                        <label className='block text-xl'>Email</label>
                        <input onChange={handleChange} type="email" placeholder='Enter Email' name='email' value={dataForm.email} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-1.5 w-[100%] focus:border-orange-500' required />

                        <label className='block text-xl'>Password</label>
                        <div className='relative'>
                            <input onChange={handleChange} type={viewPass ? `text` : 'password'} placeholder='Enter Password' name='password' value={dataForm.password} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-1.5 w-[100%] focus:border-orange-500' required />
                            <Image onClick={toggleView} width={25} height={25} className='absolute right-2 bottom-2 cursor-pointer' src={viewPass ? `/view.png` : '/hide.png'} alt="hide" />
                        </div>

                        <button type="submit" className='text-center text-xl font-semibold tracking-wider py-2 w-[100%] bg-orange-500 text-white rounded-sm mt-4 cursor-pointer'>Sign Up</button>

                        <div className='flex text-blue-500 text-sm gap-1 mt-4 justify-center'>
                            <p>Already have account?</p>
                            <Link href={'/login'}>Login</Link>
                        </div>

                    </form>
                </div>
            </div>
            <hr className='text-white w-full' />
        </div>
    )
}

export default SignUp
