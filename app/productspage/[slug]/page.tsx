'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";


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


const ProductsPage = ({ params }: ProductProps) => {
    const [products, setProducts] = useState<ProductData[] | undefined>(undefined)

    const { slug } = params

    console.log(slug)

    const getproducts = async () => {
        try {
            const {data} = await axios.post('http://localhost:3000/api/products/get', { category: slug as string })
            // console.log(data)
            setProducts(data)
        } catch (error) {
            console.log('Error while getting products' ,error)
        }
    }

    useEffect(() => {
      getproducts()
    }, [])
    

    return (
        <div className="bg-white mx-2 pt-6 md:px-2 px-1">
        <h1 className="mb-5 font-bold text-3xl pl-12">Show results for : {slug}</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3  sm:grid-cols-2   grid-cols-1 container mx-auto sm:mx-12">
          {products?.map((item: ProductData) => {
            return (
              <ProductCard key={item._id} product={item} />
            )
          })}
        </div>
      </div>
    )
}

export default ProductsPage
