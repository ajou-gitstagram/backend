const express = require('express');
const router = express.Router();
const fs = require('fs');

const gitlabBaseUrl = 'https://git.ajou.ac.kr/api/v4'; // GitLab URL 변경 필요

router.get('/', async (req, res) => {
    const jsonFile = fs.readFileSync('./data/post.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);
    const posts = jsonData.post;

    const post_num = req.query.uid
    const like_num = req.query.like

    if (post_num !== undefined && like_num !== undefined)
    {
        posts[post_num].like = like_num
    }

    fs.writeFileSync('./data/post.json', JSON.stringify({ "post" : posts }))

    const temp = posts.reverse()

    res.json(temp)
})

module.exports = router;