import React from 'react'
import Image from 'next/image'

const OfferCard = () => {
    return (
        <div>
            <Image
                src="/OffersPics/offer1.png"
                alt="off"
                width={2000}
                height={2000}
                className='cursor-pointer rounded-sm'
            />
        </div>
    )
}

export default OfferCard
