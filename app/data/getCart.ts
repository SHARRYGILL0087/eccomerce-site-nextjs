import axios from 'axios'
import React from 'react'

const getCart = async (ele: string, val: string) => {

  try {

    const res = await axios.post('http://localhost:3000/api/products/getCart', { ele: ele, name: val })

    // console.log(res.data)

    return res.data

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Err while getting Cart!', error.message)
    } else {
      console.log('Err while getting Cart!', error)
    }
  }
}

export default getCart
