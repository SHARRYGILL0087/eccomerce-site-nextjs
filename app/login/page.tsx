"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GlobalStates } from '../context/GlobalStates'

const Login = () => {
    const states = useContext(GlobalStates)
    const router = useRouter()
    const [dataForm, setDataForm] = useState({ email: '', password: '' })
    const [viewPass, setviewPass] = useState(false)
    const [isLogin, setIsLogin] = states.isLogin

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setDataForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const toggleView = () => {
        setviewPass(!viewPass)
    }

    const handleSubmit = async (e: React.InputEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/login', dataForm)
            // console.log(res.data)
            // console.log(res.data.refreshtoken)
            localStorage.setItem("refreshtoken",res.data.refreshtoken)
            setIsLogin(true)
            setDataForm({ email: '', password: '' })
            router.push('/')            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error while login', error.message)
            } else {
                console.log('Unknown err while login', error)
            }
        }
    }

    return (
        <div className='h-[90vh] sm:bg-slate-900 bg-white flex items-center justify-center'>
            <div className='rounded-lg h-[500px] w-[600px] py-3 bg-white px-4'>
                <h2 className='font-medium text-2xl mt-2'>Log In</h2>
                <p className='text-md text-gray-600 py-1.5'>Continue to ssgmart</p>
                <form onSubmit={handleSubmit} className='mt-6 px-2 space-y-2'>

                    <label className='block text-xl'>Email</label>
                    <input onChange={handleChange} type="email" placeholder='Enter Email' name='email' value={dataForm.email} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-2 w-[100%] focus:border-orange-500' required />

                    <label className='block text-xl'>Password</label>
                    <div className='relative'>
                        <input onChange={handleChange} type={viewPass ? `text` : 'password'} placeholder='Enter Password' name='password' value={dataForm.password} className='pl-3 placeholder:text-gray-500 outline-0 border-2 border-slate-800 rounded-sm py-1.5 w-[100%] focus:border-orange-500' required />
                        <Image onClick={toggleView} width={25} height={25} className='absolute right-2 bottom-2 cursor-pointer' src={viewPass ? `/view.png` : '/hide.png'} alt="hide" />
                    </div>

                    <button type="submit" className='text-center text-xl font-semibold tracking-wider py-2 w-[100%] bg-orange-500 text-white rounded-sm mt-4 cursor-pointer'>LogIn</button>

                    <div className='flex text-blue-500 text-sm gap-1 mt-4 justify-center'>
                        <p>New to SSGMART?</p>
                        <Link href={'/signup'}>Create new account</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
