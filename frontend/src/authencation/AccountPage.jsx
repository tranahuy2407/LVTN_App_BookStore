import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, clearUser,setUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
        address: user.address,
      });
    }
  }, [user]);

  const dangXuat = async () => {
    await axios.post('http://localhost:5000/logout');
    clearUser();
    setRedirect('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/updateProfile', formData);
      // console.log(response);
      setUser(response.data.user); 
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const handleEditClick = () => {
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
    });
    setEditing(true);
  };

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-24 gap-2 mb-8">
        {user && (
          <>
            <Link className={linkClasses('profile')} to="/account">Hồ sơ của bạn</Link>
            <Link className={linkClasses('favoritebooks')} to="/account/favoritebooks">Sách bạn đã yêu thích</Link>
            <Link className={linkClasses('myorders')} to="/account/myorders">Đơn hàng của bạn</Link>
          </>
        )}
      </nav>
      {user && subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Tên:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-1">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded mr-4">Lưu</button>
              <button type="button" className="bg-red-500 text-white font-semibold py-2 px-4 rounded" onClick={() => setEditing(false)}>Hủy</button>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
              <div>
                <p className="font-semibold mb-2">Tên: {user.name}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Số điện thoại: {user.phone}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Email: {user.email}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Địa chỉ: {user.address}</p>
              </div>
              <button onClick={handleEditClick} className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded">Chỉnh sửa thông tin cá nhân</button>
            </div>
          )}
          <br />
          <button onClick={dangXuat} className="max-w-sm mt-2" id="login">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
