import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='mt-24 grow flex items-center justify-around '>
        <div className='mb-64'>       
        <h1 className='text-4xl text-center mb-4'>Đăng nhập</h1>
        <form className='max-w-md mx-auto'>
            <input type='email' placeholder='Nhập email của bạn'></input>
            <input type='password' placeholder='Nhập mật khẩu của bạn'></input>
            <button className="primary" id='login'>Đăng nhập</button>
            <div className='text-center py-2 text-gray-500 font-bold '>Nếu bạn chưa có tài khoản ?   <Link to={'/signup'} className='underline text-brown hover:text-red-500'> Đăng ký tại đây!</Link></div>
        </form>
        </div>
    </div> 
  )
}

export default LoginPage