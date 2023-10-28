const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    const jsonFile = fs.readFileSync('./data/post.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);
    const posts = jsonData.post;

    const temp = posts.reverse()

    res.json(temp)
})

module.exports = router;