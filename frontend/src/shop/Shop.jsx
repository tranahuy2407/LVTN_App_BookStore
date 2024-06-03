import React, {useState, useEffect} from 'react'
import { Card } from "flowbite-react";
const Shop = () => {
  const [books,setbooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/products").then(res => res.json()).then(data => setbooks(data));
  },[])
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>Tất cả sách</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => <Card
          >
            <img src={book.images[0]} alt=""/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
             {book.description}
            </p>
            <button className='bg-blue-500 font-semibold text-white py-2 rounded'>Thêm vào giỏ hàng</button>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop
