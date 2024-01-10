const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userController = require('./Controllers/user.controller.js');

// DB 연결
mongoose
  .connect(process.env.DB)
  .then(() => console.log('몽고디비에 연결되었습니다!'))
  .catch((err) => console.log('몽고디비 연결 오류 : ', err));

// CORS 미들웨어
const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트의 주소
  credentials: true, // credentials을 허용하도록 설정
};
app.use(cors(corsOptions));

// 미들웨어
app.use(express.json()); // req.body 파싱 미들웨어
app.use(cookieParser()); // req.cookies 파싱 미들웨어

// 엔드포인트 설정
app.post('/signup', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/login/success', userController.loginSuccess);
app.post("/logout", userController.logout);

// 임의로 룸 만들어주기
const Room = require('./Models/room');
app.get('/getrooms', async (req, res) => {
  Room.insertMany([
    {
      title: '*자바스크립트 단톡방',
      members: [],
    },
    {
      title: '*리액트 단톡방',
      members: [],
    },
    {
      title: '*NodeJS 단톡방',
      members: [],
    },
  ])
    .then(() => res.send('ok'))
    .catch((error) => res.send(error));
});

module.exports = app;
