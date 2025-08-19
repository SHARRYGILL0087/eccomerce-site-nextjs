import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const CategoriesOptions = () => {

  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      image: '/categories/electronic.jpg',
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      image: '/images/categories/fashion.jpg',
    },
    {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      image: '/images/categories/home.jpg',
    },
    {
      name: 'Books',
      slug: 'books',
      image: '/images/categories/books.jpg',
    },
    {
      name: 'Sports',
      slug: 'sports',
      image: '/images/categories/sports.jpg',
    },
  ]

  return (
    <div className='my-4 bg-white py-7 px-3'>
      <h2 className='text-center font-medium text-3xl tracking-wide'>Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-7">
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <Image
                width={300}
                height={300}
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesOptions
