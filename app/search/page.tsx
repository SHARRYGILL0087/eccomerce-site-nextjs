'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import ProductCard from '@/app/components/ProductCard'

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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = useMemo(() => (searchParams.get('q') || '').trim(), [searchParams])
  const [results, setResults] = useState<ProductData[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setResults([])
        return
      }
      try {
        setLoading(true)
        const { data } = await axios.post('/api/products/get', { q })
        setResults(data)
      } catch (err) {
        setResults([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [q])

  return (
    <div className="bg-white mx-2 pt-6 md:px-2 px-1 min-h-[50vh]">
      <h1 className="mb-5 font-bold text-3xl pl-12">Search results for: {q || '—'}</h1>
      {loading && <p className="pl-12">Loading...</p>}
      {!loading && results && results.length === 0 && (
        <p className="pl-12">No products found.</p>
      )}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 container mx-auto sm:mx-12">
        {results?.map((item: ProductData) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  )
}


