const express = require('express');
const router = express.Router(); // 라우터 생성
const fs = require('fs');
const bodyParser = require('body-parser'); // Import bodyParser

router.use(bodyParser.urlencoded({ extended: true }));

// 게시물 데이터를 저장할 배열
let posts = [
    {
        id : 'ajoucon',
        content : '집가고 싶다.',
        tags : ['ajou', 'python']
    },
    {
        id : 'A',
        content : 'namje',
        tags : ['hotel', 'wheel bugs']
    },
    {
        id : 'J',
        content : 'yongji',
        tags : ['gasungbi', 'good']
    },
    {
        id : 'O',
        content : 'international',
        tags : ['expensive']
    }
];

// Load data from post.json on server start
fs.readFile('post.json', (err, data) => {
  if (!err) {
    posts = JSON.parse(data);
  }
});

// HTML 폼을 렌더링하는 라우트
router.get('/create-post', (req, res) => {
  res.send(`
    <form method="post" action="/post/create-post">
      <input type="text" name="id" placeholder="ID"><br>
      <input type="text" name="content" placeholder="내용"><br>
      <input type="text" name="tags" placeholder="태그"><br>
      <input type="submit" value="게시물 생성">
    </form>
  `);
});

// 게시물 생성 POST 라우트
router.post('/create-post', (req, res) => {
  const id = req.body.id;
  const content = req.body.content;
  const tags = req.body.tags;

  // 게시물 데이터를 배열에 추가
  posts.push({ id, content, tags });

  // Save the updated posts to post.json
  savePostsToJsonFile(posts, (err) => {
    if (err) {
      res.status(500).json({ error: '게시물을 파일에 저장하는 동안 오류가 발생했습니다.' });
    } else {
      res.send('게시물이 생성되었습니다.');
    }
  });
});

// JSON 파일에 데이터 저장하는 함수
function savePostsToJsonFile(posts, callback) {
    const jsonData = JSON.stringify(posts, null, 2);
    fs.writeFile('post.json', jsonData, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

// 게시물 목록을 보여주는 라우트
router.get('/posts', (req, res) => {
  res.json(posts);
});

module.exports = router;
