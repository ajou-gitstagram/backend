const express = require('express');
const app = express();
const port = 3000;

const rankRouter = require("./router/rank");

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
  });

app.use("/rank", rankRouter);