import React from 'react'
import FavBookimg from "../assets/fav.jpg"
import { Link } from 'react-router-dom'
const FavBook = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
      <div className='md:w-1/2'>
            <img src={FavBookimg} alt="" className='rounded md:w-10/12 '/>
      </div>

      <div className='md:w-1/2 space-y-6'>
            <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Tìm kiếm thể loại bạn yêu thích 
            <span className='text-blue-500'> tại đây !</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>Khám phá bộ sưu tập sách đa dạng của chúng tôi và tận hưởng những ưu đãi giá tốt nhất! 
            Dù bạn là người yêu thích văn học,
             đam mê khám phá tri thức hay tìm kiếm nguồn cảm hứng, chúng tôi đều có những cuốn sách phù hợp với bạn. 
             Đừng bỏ lỡ cơ hội sở hữu những tác phẩm hay với mức giá cực kỳ hấp dẫn. Hãy lựa chọn ngay hôm nay và trải nghiệm niềm vui đọc sách cùng chúng tôi!</p>

      {/* số */}
      <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
            <div>
                    <h3 className='text-3xl font-bold'>999+</h3>
                    <p className='text-base'>Sách các loại</p>
            </div>
            <div>
                    <h3 className='text-3xl font-bold'>500+</h3>
                    <p className='text-base'>Khách hàng đăng ký</p>
            </div>
            <div>
                    <h3 className='text-3xl font-bold'>300+</h3>
                    <p className='text-base'>Đánh giá tốt</p>
            </div>
      </div>

      <Link to="/shop" className='mt-12 block'>
        <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>
        Xem thêm</button> </Link>  
      </div>
    </div>
  )
}

export default FavBook
