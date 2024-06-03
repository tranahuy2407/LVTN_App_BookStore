import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/*ben trai*/}
        <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-medium leading-snug text-black'>Hãy lựa chọn sách của chúng tôi <span className='text-blue-700'>
                với giá tốt nhất</span></h2>
            <p className='md:w-4/5 text-2xl'><i>&quot;Sách mở ra những chân trời mới, giúp ta nhìn thấy thế giới từ muôn vàn góc nhìn.&quot;</i></p>
            <div className='flex'>
                <input type="text" name="search" id="search" placeholder='Tìm kiếm sách hoặc thể loại bạn muốn' className='py-2 px-2 h-12 rounded-s-sm outline-none w-1/2'/>
                <button className='bg-blue-700 h-12 px-4  text-white font-medium hover:bg-black transition-all ease-in duration-200 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </div>

        {/*ben phai*/}
        <div>
            <BannerCard/>
        </div>

      </div>
    </div>
  )
}

export default Banner
