import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, clearUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const dangXuat = async () => {
    await axios.post('http://localhost:5000/logout');
    clearUser();
    setRedirect('/');
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
          Đăng nhập vào {user.name} ({user.email}) <br />
          <button onClick={dangXuat} className="max-w-sm mt-2" id="login">Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
