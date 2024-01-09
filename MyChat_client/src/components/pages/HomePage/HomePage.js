import { useContext, useState } from 'react';
import LoginModal from '../../LoginModal/LoginModal';
import './HomePage.css';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../../contexts/LoginContext';
import { UserContext } from '../../../contexts/UserContext';

const HomePage = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  console.log('isLogin : ', isLogin);
  console.log('user : ', user);

  const handleLogoutSuccess = () => {
    setIsLogin(false);
    setUser(null);
  };

  const navigate = useNavigate();

  const moveToRoomList = () => {
    navigate(`/roomList`);
  };
  return (
    <div className="home-body">
    <h1 className="home-title">뇽챗 HomePage입니다</h1>

      {!isLogin ? (
        <div className="nonLoggedIn-area">
          <LoginModal />
        </div>
      ) : (
        <div className="loggedIn-area">
          <p className="welcome-userName">반갑습니다 {user.email}님~~ !</p>
          <div
            onClick={() => {
              moveToRoomList();
            }}
            className="toRoomList"
          >
            채팅하러 가기
          </div>
          <button onClick={handleLogoutSuccess} className="logout-button">
            로그아웃 임시
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
