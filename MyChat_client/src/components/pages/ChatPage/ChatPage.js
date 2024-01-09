import React, { useContext, useEffect, useState } from 'react';
import socket from '../../../server';
import MessageContainer from '../../MessageContainer/MessageContainer';
import InputField from '../../InputField/InputField';
import './ChatPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/base/Button';
import { UserContext } from '../../../contexts/UserContext';

const ChatPage = () => {
  const { id } = useParams(); //url에서 룸id 가져오기
  console.log('ChatPage id', id);
  const [roomTitle, setRoomTitle] = useState('');
  const { user } = useContext(UserContext);

  const [messageList, setMessageList] = useState([]);
  console.log('messageList', messageList);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('message', (res) => {
      console.log('message', res);
      setMessageList((prevState) => prevState.concat(res));
    });
    socket.emit('joinRoom', id, (res) => {
      if (res && res.ok) {
        console.log('successfully joined', res);
        setRoomTitle(res.room);
      } else {
        console.log('failed to join', res);
      }
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('sendMessage', message, (res) => {
      if (!res.ok) {
        console.log('sendMessage error', res.error);
      }
      setMessage('');
    });
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', user, (res) => {
      console.log('leaveRoom res', res);
      if (res.ok) navigate('/roomList'); //다시 채팅방 리스트 페이지로 이동
    });
  };

  return (
    <div>
      <div className="App">
        <nav>
          <div className="nav-user">{user.name}</div>
          <div className="nav-room">
            <Button onClick={leaveRoom} className="back-button">
              ←
            </Button>
            <div className="room-title">{roomTitle}</div>
          </div>
        </nav>
        <div className="upper-container">
          {messageList.length > 0 ? (
            <MessageContainer messageList={messageList} user={user} />
          ) : null}
        </div>
        <div className="lower-container">
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
