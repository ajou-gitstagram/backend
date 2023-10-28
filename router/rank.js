const express = require('express');
const router = express.Router();
const axios = require('axios');

const gitlabBaseUrl = 'https://git.ajou.ac.kr/api/v4'; // GitLab URL 변경 필요

let people =
[
    {
        id : "taerim23",
        commits : 4
    },
    {
        id : "hyeonsu",
        commits : 5
    },
    {
        id : "minxae",
        commits : 8
    },
    {
        id : "hyeonsu5",
        commits : 12
    },
    {
        id : "hyeongseok",
        commits : 25
    },
    {
        id : "minjoon2",
        commits : 26
    }
]

// console.log(people);

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const sorttype = req.query.type;

    if (sorttype == 'commits')
    {
        let cnt = 0;

        try {
            const response = await axios.get(`${gitlabBaseUrl}/users/${userId}/events`);
            const activity_log = response.data
        
            // console.log(activity_log);
            console.log(activity_log.length);    
         
            for (let i = 0; i < activity_log.length; i++){
                if (activity_log[i].action_name == 'pushed new' || activity_log[i].action_name == 'pushed to') cnt++
            }
        
            console.log(cnt);
            console.log(sorttype)
            
        }   
        catch(e) {
                // 오류 발생시 실행
            
                console.log(e);
                res.status(500).json({ error: '오류 발생' });
        }
    
        var returnValue = people.find(function(data){ return data.id === userId});
    
        if (returnValue === undefined) people.push({ id: userId, commits: cnt })

        const temp = people.sort((a,b) => {return b.commits - a.commits});

        res.json(temp);
    }

    if (sorttype == 'likes')
    {
        
    }
})

module.exports = router;