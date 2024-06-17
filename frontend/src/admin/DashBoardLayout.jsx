import React from 'react'
import { Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Sidebar from '../admin/components/Sidebar'
import Products from './components/Products'; 
import Header from './components/Header';
const DashBoardLayout = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      
      <Sidebar />
      {/* <Products /> */}
      
      

      <div className='flex-1'>
        <Header />

        <div className='p-4'>{<Outlet />} </div>

      </div>
    </div>
    
  )
}

export default DashBoardLayout