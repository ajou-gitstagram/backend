const express = require('express');
const router = express.Router();
const fs = require('fs');

const gitlabBaseUrl = 'https://git.ajou.ac.kr/api/v4'; // GitLab URL 변경 필요

router.get('/', async (req, res) => {
    const jsonFile = fs.readFileSync('./data/post.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);
    const posts = jsonData.post;

    const temp = posts.reverse()

    res.json(temp)
})

module.exports = router;