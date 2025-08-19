'use client'
import Image from "next/image";
import Buttons from "./components/Buttons";
import OfferCard from "./components/OfferCard";
import ProductsRow from "./components/ProductsRow";
import CategoriesOptions from "./components/CategoriesOptions";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

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

  const [generalPro, setGeneralPro] = useState<ProductData[]>([])

  const getGeneralPro = async () => {
    const res = await axios.post('http://localhost:3000/api/products/get', { category: 'general' })
    // console.log(res.data)
    setGeneralPro(res.data)
  }


  useEffect(() => {
    getGeneralPro()
  }, [])




  return (
      <div className="bg-slate-100">
        <hr className="text-orange-400" />
        <div className="container mx-auto w-[98vw]">
          <Buttons />
          <div>
            <OfferCard />
          </div>
          <CategoriesOptions />
          <ProductsRow />
          <ProductsRow />
          <div className="bg-white mx-2 pt-6 md:px-2 px-1">
            <h1 className="mb-5 font-bold text-3xl pl-12">Product For You</h1>
            <div className="grid lg:grid-cols-5 md:grid-cols-3  sm:grid-cols-2   grid-cols-1 container mx-auto sm:mx-12">
              {generalPro.map((item: ProductData) => {
                return (
                  <ProductCard key={item._id} product={item} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
  );
}
