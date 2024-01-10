const chatController = require('../Controllers/chat.controller');
const userController = require('../Controllers/user.controller');
const roomController = require('../Controllers/room.controller');

module.exports = function (io) {
  // io 관련 모든 일
  io.on('connection', async (socket) => {
    console.log('client is connected : ', socket.id);

    //룸 정보 보내주기
    socket.on('getRooms', async () => {
      console.log('io.js/getRooms called');
      socket.emit('rooms', await roomController.getAllRooms());
    });

    //룸 입장하기
    socket.on('joinRoom', async (rid, cb) => {
      console.log('io.js/joinRoom called');
      try {
        const user = await userController.checkUser(socket.id); //유저정보 찾기
        const room = await roomController.checkRoom(rid); //룸정보 찾기

        await roomController.joinRoom(rid, user); //room,user모델 업데이트
        const userRoomToString = user.room.toString();
        // console.log("userRoomTostring", userRoomToString);
        socket.join(userRoomToString); //해당 룸채널 조인
        const welcomeMessage = {
          chat: `${user.name} joined this room`,
          user: { id: null, name: 'system' },
        };
        io.to(userRoomToString).emit('message', welcomeMessage); //해당룸에 유저 입장 메세지 보냄
        io.emit('rooms', await roomController.getAllRooms()); //실시간 룸정보 전체 유저들에게 보냄
        cb({ ok: true, room: room.title });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    //룸 새로 만들기
    socket.on('createRoom', async (title, cb) => {
      console.log('io.js/createRoom called', title);
      try {
        const user = await userController.checkUser(socket.id); //유저정보 찾기
        const room = await roomController.createRoom(title, user); //룸 새로 만들기
        cb({ ok: true, room: room });
        socket.emit('rooms', await roomController.getAllRooms()); //실시간 룸정보 보내주기
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    //메시지 들어오면
    socket.on('sendMessage', async (receivedMessage, cb) => {
      try {
        //유저정보 찾기
        const user = await userController.checkUser(socket.id);
        if (user) {
          //메세지 저장(유저 정보 전달)
          const newMessage = await chatController.saveChat(
            receivedMessage,
            user
          );
          //해당 방에 메세지 보냄
          io.to(user.room.toString()).emit('message', newMessage);
          cb({ ok: true });
        }
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    //유저 퇴장하면
    socket.on('leaveRoom', async (_, cb) => {
      try {
        //유저 정보를 찾아 룸 정보 업데이트
        const user = await userController.checkUser(socket.id);
        console.log('퇴장하는 user : ', user);
        const room = await roomController.leaveRoom(user);
        //해당 룸에 퇴장메시지 남김
        const leavingMessage = {
          chat: `${user.name} left this room`,
          user: { id: null, name: 'system' },
        };
        socket.broadcast
          .to(user.room.toString())
          .emit('message', leavingMessage); //socket.broadcast 의 경우 io.to()와 달리, 나를 제외한 해당룸 모든 멤버에게 메세지를 보냄
        //소켓에서 해당 룸 퇴장 처리
        io.emit('rooms', await roomController.getAllRooms());
        socket.leave(user.room.toString()); //해당 룸채널을 떠남
        //해당 룸 0명이면 삭제
        if (room.members.length == 0) {
          await roomController.deleteRoom(room._id);
          io.emit('rooms', await roomController.getAllRooms());
        }
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('user is disconnected : ', socket.id);
    });
  });
};
