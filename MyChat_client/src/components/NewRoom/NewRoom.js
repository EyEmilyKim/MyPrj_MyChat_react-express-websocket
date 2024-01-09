import { Input } from '@mui/base';
import { Button } from '@mui/base/Button';
import { useState } from 'react';
import './NewRoom.css';
import socket from '../../server';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const createRoom = (event) => {
    event.preventDefault();
    //룸을 새로 만들고
    socket.emit('createRoom', newTitle, (res) => {
      // console.log("createRoom called", newTitle);
      if (res && res.ok) {
        console.log('successfully created', res);
        const rid = res.room._id;

        //해당 룸으로 이동
        navigate(`/room/${rid}`);
      } else {
        console.log('failed to created', res);
        alert(res.error);
      }
    });
  };

  return (
    <div className="newRoom-area">
      <form onSubmit={createRoom} className="newRoom-container">
        <Input
          className="newRoom-input"
          placeholder="새로운 방 제목.."
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          multiline={false}
          rows={1}
        />
        <Button
          disabled={newTitle === ''}
          type="submit"
          className="newRoom-button"
        >
          만들기
        </Button>
      </form>
    </div>
  );
};

export default NewRoom;
