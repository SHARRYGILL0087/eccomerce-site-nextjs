'use client'
import { createContext, useEffect, useState } from "react"
import getCart from "../data/getCart"
import axios from "axios";




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

interface IUser {
    _id?: string;    
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface GlobalStatesType {
    cartPros: [ProductData[], React.Dispatch<React.SetStateAction<ProductData[]>>];
    wishPros: [ProductData[], React.Dispatch<React.SetStateAction<ProductData[]>>];
    cartSize: [number, React.Dispatch<React.SetStateAction<number>>];
    wishSize: [number, React.Dispatch<React.SetStateAction<number>>];
    refreshCart: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    refreshWish: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    isLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    user: [IUser | null,React.Dispatch<React.SetStateAction<IUser | null>>]
}

export const GlobalStates = createContext<GlobalStatesType>({
    cartPros: [[], () => { }],
    wishPros: [[], () => { }],
    cartSize: [0, () => { }],
    wishSize: [0, () => { }],
    refreshCart: [false, () => { }],
    refreshWish: [false, () => { }],
    isLogin: [false, () => { }],
    user: [null, () => { }]

})

interface DataProviderProps {
    children: React.ReactNode
}


const DataProvider = ({ children }: DataProviderProps) => {



    const [cartPro, setCartPro] = useState<ProductData[]>([])
    const [wishPro, setWishPro] = useState<ProductData[]>([])
    const [wishSize, setWishSize] = useState<number>(0)
    const [cartSize, setCartSize] = useState<number>(0)
    const [user, setUser] = useState<IUser | null>(null)
    const [refreshCart, setRefreshCart] = useState<boolean>(false)
    const [refreshWish, setRefreshWish] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)


    const fetchPro = async (key: string, val: string): Promise<ProductData[]> => {
        const data = await getCart(key, val)
        return data.res
    }



    const getUserId = async () => {
        const rf_token = localStorage.getItem('refreshtoken')
        if (!rf_token) return;
        if (user) return;
        try {
            const res = await axios.post('http://localhost:3000/api/refresh_token', { rf_token })
            // console.log('rf_token res ->',res.data.userId)
            const usr = await axios.post('http://localhost:3000/api/user', { id: res?.data?.userId })
            // console.log(usr.data.User)
            setUser(usr.data.User)
            setIsLogin(true)

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log({ msg: 'Error occur while getting userId', error })
            } else {
                console.log({ msg: 'Unknown Error occur while getting userId', error })
            }
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    useEffect(() => {
        fetchPro('isCart', 'true').then(pros => {
            // console.log('Pros', pros)
            setCartPro(pros)
            setCartSize(pros.length)
        })
    }, [refreshCart])

    useEffect(() => {
        fetchPro('isWishList', 'true').then(pros => {
            // console.log('Pros', pros)
            setWishPro(pros)
            setWishSize(pros.length)
        })
    }, [refreshWish])




    // console.log('First', cartPro, cartSize)

    const states: GlobalStatesType = {
        cartPros: [cartPro, setCartPro],
        wishPros: [wishPro, setWishPro],
        cartSize: [cartSize, setCartSize],
        wishSize: [wishSize, setWishSize],
        refreshCart: [refreshCart, setRefreshCart],
        refreshWish: [refreshWish, setRefreshWish],
        isLogin: [isLogin, setIsLogin],
        user: [user, setUser]
    }

    return (
        <GlobalStates.Provider value={states}>
            {children}
        </GlobalStates.Provider>
    )

}

export default DataProvider
