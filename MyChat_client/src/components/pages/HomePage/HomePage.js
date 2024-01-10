import { useContext, useEffect } from 'react';
import LoginModal from '../../LoginModal/LoginModal';
import './HomePage.css';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../../contexts/LoginContext';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';

const HomePage = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  console.log('isLogin : ', isLogin);
  console.log('user : ', user);

  useEffect(() => {
    try {
      axios({
        url: 'http://localhost:5001/login/success',
        method: 'GET',
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    console.log('handleLogout called');

    axios({
      url: 'http://localhost:5001/logout',
      method: 'POST',
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        alert('로그아웃 성공!');
        setIsLogin(false);
        setUser(null);
      } else {
        console.log(res.data.error);
        alert(res.data.error);
      }
    });
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
          <p className="welcome-userName">
            반갑습니다 {user.name || user.email}님~~ !
          </p>
          <div
            onClick={() => {
              moveToRoomList();
            }}
            className="toRoomList"
          >
            채팅하러 가기
          </div>
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
