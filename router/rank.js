const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

const gitlabBaseUrl = 'https://git.ajou.ac.kr/api/v4'; // GitLab URL 변경 필요

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const ranktype = req.query.type;

    if (ranktype == 'commits') // ranktype이 commits라면
    {
        const jsonFile = fs.readFileSync('./data/people.json', 'utf8');
        const jsonData = JSON.parse(jsonFile);
        const peoples = jsonData.people;

        let cnt = 0;

        try { // activity에서 commit 횟수를 count하는 작업
            const response = await axios.get(`${gitlabBaseUrl}/users/${userId}/events`);
            const activity_log = response.data

            // console.log(response)
        
            // console.log(activity_log);
            console.log(`activity_data count : ${activity_log.length}`);    
         
            for (let i = 0; i < activity_log.length; i++){
                if (activity_log[i].action_name != 'created') cnt++
            }
        
            console.log(`commits count : ${cnt}`);
            console.log(`sort type : ${ranktype}`)
            
        }   
        catch(e) {
                // 오류 발생시 실행
            
                console.log(e);
                res.status(500).json({ error: '오류 발생' });
        }
    
        var returnValue = peoples.find(function(data){ return data.id === userId});
    
        if (returnValue === undefined) // people.json에 해당 유저에 대한 정보가 없으면 추가
        {
            peoples.push({ "id": userId, "commits": cnt })
        }
        else // people.json에 해당 유저에 대한 정보가 있으면 commits만 업데이트
        {
            for (let i = 0; i < peoples.length; i++)
            {
                if (peoples[i].id == userId)
                    peoples[i].commits = cnt;
            }
        }

        const temp = peoples.sort((a,b) => {return b.commits - a.commits})
        
        fs.writeFileSync('./data/people.json', JSON.stringify({ "people" : temp }))

        res.json(temp);
    }
    if (ranktype == "likes")
    {
        const jsonFile = fs.readFileSync('./data/post.json', 'utf8');
        const jsonData = JSON.parse(jsonFile);
        const posts = jsonData.post;

        const temp = posts.sort((a,b) => {return b.like - a.like})

        console.log(`post count : ${temp.length}`)

        res.json(temp)
    }
})

module.exports = router;