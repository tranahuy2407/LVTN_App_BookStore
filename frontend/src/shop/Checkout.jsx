import React, { useContext, useState, useEffect } from 'react';
import VNpay from '../assets/vnpay_logo.jpg';
import ZaloPay from '../assets/ZaloPay_Logo.jpg';
import Cash from '../assets/Cash_Logo.jpg';
import MoMo from '../assets/MoMo_Logo.png';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../authencation/UserContext';

const Checkout = () => {
  const { cartItems, discountCode, discountApplied, discountedPrice, totalPrice, clearCart} = useContext(CartContext);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    if (user) { 
      setUserId(user._id); 
    }
  }, [user]); 

  const finalPrice = discountApplied ? discountedPrice : totalPrice;
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!fullName || !phone || !address || !paymentMethod || cartItems.length === 0) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        cart: cartItems.map(item => ({
          book: {
            _id: item._id,
            name: item.name,
            quantity: item.quantity,
            description: item.description,
            images : item.images,
            price: item.price,
            categories: item.categories 
          },
          quantity: item.cartQuantity,
        })),
        totalPrice: finalPrice,
        address,
        paymentMethod,
        discountCode: discountCode ? discountCode.code : null,
        phone,
        userId: userId,
      }),
    });
  
    const data = await response.json();

    if (response.ok) {
      clearCart();
      navigate('/invoice');
 
    } else {
      setErrorMessage(data.msg || 'Đã xảy ra lỗi trong quá trình đặt hàng.');
    }
  };
  console.log(cartItems);


  return (
    <div className="relative mx-auto w-full bg-white mt-28">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Chi tiết thanh toán
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col space-y-4">
              <div>
                <label htmlFor="fullName" className="text-xs font-semibold text-gray-500">Họ tên</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Nguyễn Văn A" 
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs font-semibold text-gray-500">Số điện thoại</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone" 
                  placeholder="0123456789" 
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="text-xs font-semibold text-gray-500">Địa chỉ nhận hàng</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  placeholder="123 Đường ABC, Quận XYZ" 
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Phương thức thanh toán</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="cod" 
                      name="paymentMethod" 
                      value="cod" 
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" 
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label htmlFor="cod" className="ml-2 block text-sm font-medium text-gray-700">Thanh toán khi nhận hàng</label>
                    <img src={Cash} alt="Cash Logo" className="h-12 w-12" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="zalopay" 
                      name="paymentMethod" 
                      value="zalopay" 
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" 
                      checked={paymentMethod === 'zalopay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label htmlFor="zalopay" className="block text-sm font-medium text-gray-700">Thanh toán ZaloPay</label>
                    <img src={ZaloPay} alt="ZaloPay Logo" className="h-12 w-12" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="vnpay" 
                      name="paymentMethod" 
                      value="vnpay" 
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" 
                      checked={paymentMethod === 'vnpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label htmlFor="vnpay" className="block text-sm font-medium text-gray-700">Thanh toán VNPay</label>
                    <img src={VNpay} alt="VNPay Logo" className="h-12 w-12" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="momo" 
                      name="paymentMethod" 
                      value="momo" 
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" 
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label htmlFor="momo" className="block text-sm font-medium text-gray-700">Thanh toán MoMo</label>
                    <img src={MoMo} alt="MoMo Logo" className="h-12 w-12" />
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              >
                Thanh toán
              </button>
            </form>
            {errorMessage && (
              <p className="mt-4 text-center text-sm font-semibold text-red-500">{errorMessage}</p>
            )}
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              Đặt đơn hàng nếu như bạn đồng ý <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">điều khoản và điều kiện</a>
            </p>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <div>
            <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <div className="inline-flex">
                    <img src={item.images} alt={item.name} className="max-h-16" />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">{item.name}</p>
                      <p className="text-sm font-medium text-white text-opacity-80">Số lượng: {item.cartQuantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.price} VNĐ</p>
                </li>
              ))}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>Tổng cộng:</span><span>{totalPrice} VNĐ</span></p>
              <p className="flex justify-between text-sm font-medium text-white"><span>Đã áp dụng mã giảm:</span><span>{discountApplied ? `${discountedPrice - totalPrice} VNĐ` : 'Không có'}</span></p>
              <p className="flex justify-between text-lg font-bold text-white"><span>Giá sau giảm:</span><span>{finalPrice} VNĐ</span></p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Hỗ trợ</h3>
            <p className="text-sm font-semibold">+84 343 899 504 <span className="font-light">(Quản trị viên)</span></p>
            <p className="mt-1 text-sm font-semibold">tranahuy247@gmail.com <span className="font-light">(Email)</span></p>
            <p className="mt-2 text-xs font-medium">
              Hãy gọi ngay cho chúng tôi nếu có vấn đề liên quan đến thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
