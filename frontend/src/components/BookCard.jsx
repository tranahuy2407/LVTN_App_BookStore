import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

const BookCard = ({ headline, books }) => {

  const [authorNames, setAuthorNames] = useState({});
  useEffect(() => {
    const fetchAuthors = async () => {
      const fetchedAuthors = {};
      for (const book of books) {
        if (book.author) {
          try {
            const response = await fetch(`http://localhost:5000/author/${book.author}`);
  
            if (response.ok) {
              const data = await response.json();
              fetchedAuthors[book.author] = data.name;
      
            } else {
              fetchedAuthors[book.author] = 'Unknown Author';
            }
          } catch (error) {
            console.error("Lỗi:", error);
            fetchedAuthors[book.author] = 'Unknown Author';
          }
        } else {
          fetchedAuthors[book.author] = 'Unknown Author';
        }
      }
      setAuthorNames(fetchedAuthors);
    };

    fetchAuthors();
  }, [books]);


  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
      <div className='mt-12'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full h-full"
        >
          {books.map(book => (
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`}>
                <div className='relative'>
                  <img src={book.images} alt={book.name} className="w-full" />
                  
                  {book.promotion_percent && (
                    <div className='absolute top-0 left-0 bg-red-500 text-white p-1 text-sm font-bold rounded-br-lg'>
                    -  {book.promotion_percent}% 
                    </div>
                    <div className='absolute top-3 right-3 bg-blue-300 hover:bg-black p-2 rounded'>
                        <FaCartShopping className='w-4 h-4 text-white '/>
                    </div>

                    <div>
                        <h3>{book.name}</h3>
                        <p> {/* tac gia */}</p>
                    </div>
                    <div>
                        <p>{book.price} VNĐ</p>
                    </div>
                </Link>
            </SwiperSlide>)
        }
      </Swiper>
      </div>
    </div>
  );
};

export default BookCard;
