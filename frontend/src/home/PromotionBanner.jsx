import React from 'react'
import { Link } from 'react-router-dom'
import promotionBanner from "../assets/promotion_1-6.jpg"

const PromotionBanner = () => {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24  '>
        <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='md:w-1/2 '>
                <h2 className='text-4xl font-bold mb-6 leading-snug'>Khuyến mãi 25% cho tất cả truyện tranh cho ngày quốc tế thiếu nhi</h2>
                
                <Link to="/shop" className='block'>
                    <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>
                    Xem ngay </button> </Link>  
            </div>
            <div>
                <img src={promotionBanner}/>
            </div>
        </div>
    </div>
  )
}

export default PromotionBanner
