import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className='mt-24 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Đăng ký</h1>
        <form className='max-w-md mx-auto'>
          <input type='email' placeholder='Nhập email của bạn' className='block w-full mb-4 p-2 border rounded' />
          <input type='password' placeholder='Nhập mật khẩu của bạn' className='block w-full mb-4 p-2 border rounded' />
          <input type='text' placeholder='Nhập tên của bạn' className='block w-full mb-4 p-2 border rounded' />
          <input type='text' placeholder='Nhập số điện thoại của bạn' className='khung block w-full mb-4 p-2 border rounded' />
          <button className='primary w-full mb-4 py-2 bg-blue-600 text-white rounded' id='login'>Đăng ký</button>
          <div className='text-center py-2 text-gray-500 font-bold'>
            Nếu bạn đã có tài khoản?
            <Link to={'/login'} className='underline text-brown hover:text-red-500'> Đăng nhập tại đây!</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
