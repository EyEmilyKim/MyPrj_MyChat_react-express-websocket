const Chat = require('../models/chat');
const chatController = {};

chatController.saveChat = async (message, user) => {
  console.log('saveChat called');
  console.log('user.name : ', user.name);
  console.log('message : ', message);
  const newChat = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.name,
    },
    room: user.room, // 메세지에 귀속 룸 정보 저장
  });
  await newChat.save();
  return newChat;
};

module.exports = chatController;
