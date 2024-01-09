const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const Room = require('./Models/room');

mongoose
  .connect(process.env.DB)
  .then(() => console.log('몽고디비에 연결되었습니다!'))
  .catch((err) => console.log('몽고디비 연결 오류 : ', err));

// 임의로 룸 만들어주기
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
