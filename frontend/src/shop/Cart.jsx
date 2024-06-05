import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  console.log(cartItems);
  // Tính tổng số lượng và tổng giá tiền của các sản phẩm trong giỏ hàng
  const totalQuantity = cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p className='text-center text-2xl'>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className='my-12'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='py-2'>Ảnh</th>
                <th className='py-2'>Tên sách</th>
                <th className='py-2'>Số lượng</th>
                <th className='py-2'>Đơn giá</th>
                <th className='py-2'>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.cartId} className='border-t'>
                  <td className='py-4'>
                    <img src={item.images} alt={item.name} className='w-20 h-20 object-cover' />
                  </td>
                  <td className='py-4 text-center'>{item.name}</td>
                  <td className='py-4'>
                    <div className='flex items-center justify-center'>
                      <button className='bg-blue-500 font-semibold text-white py-2 px-4 rounded' onClick={() => decreaseQuantity(item.cartId)}>
                        -
                      </button>
                      <span className='mx-2'>{item.cartQuantity}</span>
                      <button className='bg-blue-500 font-semibold text-white py-2 px-4 rounded' onClick={() => increaseQuantity(item.cartId)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className='py-4 text-center'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td className='py-4 text-center'>
                    <button className='bg-red-500 font-semibold text-white py-2 px-4 rounded' onClick={() => removeFromCart(item.cartId)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between mt-4'>
            <div>
              <p className='text-xl font-semibold'>Tổng cộng: {totalQuantity} sản phẩm</p>
              <p className='text-xl font-semibold'>Thành tiền: {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
            <div>
              <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-4'>Tiếp tục mua sách</button>
              <button className='bg-green-500 text-white font-semibold py-2 px-4 rounded'>Thanh toán</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
