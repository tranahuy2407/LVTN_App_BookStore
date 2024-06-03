import React from 'react'
import Banner from '../components/Banner'
import BestSellerBooks from '../home/BestSellerBooks'
import FavBook from './FavBook'
import PromotionBanner from './PromotionBanner'
import OrtherBook from './OrtherBook'
import Review from './Review'
import Footerr from '../components/Footerr'
const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerBooks/>
      <FavBook/>
      <PromotionBanner/>
      <OrtherBook />
      <Review />
    </div>
  )
}

export default Home
