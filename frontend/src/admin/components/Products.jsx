import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 '>
        <strong className='text-gray-700 font-medium'>Danh sách sản phẩm</strong>
        <div className='mt-3'>
        <table className='w-full text-gray-700'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Tên sản phẩm</td>
                    <td>Mô tả</td>
                    <td>Giá niêm yết</td>
                    <td>Giá khuyến mãi</td>
                    <td>Thể loại</td>
                    <td>Nhà xuất bản</td>
                    <td>Số lượng</td>
                    <td>Hành động</td>
                </tr>
            </thead>

            <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.discount_price}</td>
                <td>{product.category}</td>
                <td>{product.publishers}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/edit-product/${product._id}`} className='text-blue-500'>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
            
        </table>

        </div>
    </div>
  )
}
