import React, { useState, useEffect, useContext } from 'react';
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import GrayHeartIcon from '../assets/wishlist.png';
import RedHeartIcon from '../assets/wishlist-red.png'; 
import { UserContext } from '../authencation/UserContext';
import axios from 'axios';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorNames, setAuthorNames] = useState({});
  const [filterPrice, setFilterPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user)
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setBooks(data));

    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch("http://localhost:5000/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);

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

  const handlePriceFilterChange = (event) => {
    setFilterPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(category => category !== value)
    );
  };

  const handleAuthorChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAuthors(prev =>
      checked ? [...prev, value] : prev.filter(author => author !== value)
    );
  };

  const toggleFavorite = (bookId) => {
    const isCurrentlyFavorite = favorites.includes(bookId);
    const url = isCurrentlyFavorite ? 'http://localhost:5000/remove-favorite' : 'http://localhost:5000/add-favorite';
    
    const method = isCurrentlyFavorite ? 'delete' : 'post';
  
    axios({
      method: method,
      url: url,
      data: {
        userId: user._id,   
        bookId: bookId
      }
    })
      .then(() => {
        if (isCurrentlyFavorite) {
          setFavorites(favorites.filter(id => id !== bookId));
        } else {
          setFavorites([...favorites, bookId]);
        }
      })
      .catch(error => console.error(`Error ${method === 'post' ? 'adding' : 'removing'} favorite:`, error));
  };
  

  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  const filteredBooks = books.filter(book => {
    let priceCondition = true;
    let categoryCondition = true;
    let authorCondition = true;

    if (filterPrice === '<50') {
      priceCondition = book.promotion_price < 50000;
    } else if (filterPrice === '50-100') {
      priceCondition = book.promotion_price >= 50000 && book.promotion_price <= 100000;
    } else if (filterPrice === '100-300') {
      priceCondition = book.promotion_price >= 100000 && book.promotion_price <= 300000;
    } else if (filterPrice === '>300') {
      priceCondition = book.promotion_price >= 300000;
    }

    if (selectedCategories.length > 0) {
      categoryCondition = selectedCategories.some(selectedCategory => {
        return book.categories.includes(selectedCategory);
      });
    }

    if (selectedAuthors.length > 0) {
      authorCondition = selectedAuthors.includes(book.author);
    }

    return priceCondition && categoryCondition && authorCondition;
  });

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <div className="flex">
        <div className="w-1/5 mt-8 space-y-4"> 
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Thể loại</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category._id} className="flex items-center">
                  <label className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                    <input
                      type="checkbox"
                      value={category._id}
                      onChange={handleCategoryChange}
                      className="mr-2 accent-blue-500"
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Tác giả</h3>
            <ul className="space-y-2">
              {authors.map(author => (
                <li key={author._id} className="flex items-center">
                  <label className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                    <input
                      type="checkbox"
                      value={author._id}
                      onChange={handleAuthorChange}
                      className="mr-2 accent-blue-500"
                    />
                    {author.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Lọc theo giá</h3>
            <select value={filterPrice} onChange={handlePriceFilterChange} className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Tất cả giá</option>
              <option value="<50">Giá dưới 50.000 VNĐ</option>
              <option value="50-100">Giá từ 50.000 VNĐ đến 100.000 VNĐ</option>
              <option value="100-300">Giá từ 100.000 VNĐ đến 300.000 VNĐ</option>
              <option value=">300">Giá hơn 300.000 VNĐ</option>
            </select>
          </div>
        </div>

        <div className="w-4/5">
          <h2 className='text-5xl font-bold text-center text-gray-900'>Tất cả sách</h2>
          <div className='grid gap-8 my-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {filteredBooks.length > 0 ? (
              filteredBooks.map(book => (
                <Card key={book._id} className="relative rounded-lg shadow-md hover:shadow-xl">
                  {book.promotion_percent && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{book.promotion_percent}%
                    </div>
                  )}
                  <img src={book.images} alt={book.name} className="rounded-t-lg h-64 sm:h-72 object-contain"/>
                  <img
                    src={isFavorite(book._id) ? RedHeartIcon : GrayHeartIcon}
                    className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
                    alt="Heart Icon"
                    onClick={() => toggleFavorite(book._id)}
                  />
                  <div className="p-4 text-center">
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">
                      {book.name}
                    </h5>
                    <p className="text-gray-500 italic mb-2">
                      {authorNames[book.author] || "Loading..."}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold text-blue-600">
                        {book.promotion_price.toLocaleString()} VNĐ
                      </span>
                      <span className="text-gray-500 line-through ml-2">
                        {book.price.toLocaleString()} VNĐ
                      </span>
                    </p>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold mb-2' onClick={() => addToCart(book)}>
                      Thêm vào giỏ hàng
                    </button>
                    <Link to={`/book/${book._id}`} className='bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-semibold ml-2 mb-2'>
                      Chi tiết
                    </Link>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-700 text-center">Không có sách nào phù hợp với bộ lọc đã chọn.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;