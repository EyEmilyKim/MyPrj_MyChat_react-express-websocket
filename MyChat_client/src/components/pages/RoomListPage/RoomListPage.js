import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomListPage.css';
import NewRoom from '../../NewRoom/NewRoom';
import socket from '../../../server';
import { UserContext } from '../../../contexts/UserContext';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(UserContext);
  console.log('user', user);

  useEffect(() => {
    socket.emit('getRooms');
    socket.on('rooms', (rooms) => {
      setRooms(rooms);
      console.log('rooms', rooms);
    });
  }, []);

  const navigate = useNavigate();

  const moveToChat = (rid) => {
    navigate(`/room/${rid}`);
  };

  return (
    <div className="room-body">
      <div className="room-nav">채팅 ▼</div>

      {rooms.length > 0
        ? rooms.map((room) => (
            <div
              className="room-list"
              key={room._id}
              onClick={() => moveToChat(room._id)}
            >
              <div className="room-title">
                <img src="/profile.jpeg" />
                <p>{room.title}</p>
              </div>
              <div className="member-number">({room.members.length}명)</div>
            </div>
          ))
        : null}

      <NewRoom />
    </div>
  );
};

export default RoomListPage;
