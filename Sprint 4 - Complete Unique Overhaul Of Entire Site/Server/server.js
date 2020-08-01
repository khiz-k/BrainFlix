const express = require('express');
const bodyParser = require('body-parser');
const videoList = require('./database/videoLinks.json');
const videos = require('./database/videos.json');
const uuidv4 = require('uuid/v4');
const morgan = require('morgan');
// const cors = require('cors');

const app = express();
port1 = 8080;

const api_key = ['12345678','abcdefgh', '87654321'];

// parse application/x-www-form-urlencoded
app.use(morgan('common'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

// routing callback handlers
const callback = {
    getVideoList: (req, res) => {
        if (req.query.api_key && api_key.includes(req.query.api_key)) {
            res.json(videoList);
        } else {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        }
    },
    playVideo: (req, res) => {
        const { vidId } = req.params;
        const req_key = req.query.api_key;
        const targetVideo = videos.find((video) => video.id === vidId);
        // check if api key is provided or valid
        if (!req_key || !api_key.includes(req_key)) {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        // check if video id provided is valid
        } else if (!targetVideo) {
            res.status(401).json({
                Error: 'Invalid video ID provided.'
            });
        } else {
            try {
                const targetVideo = videos.find((video) => video.id === vidId);
                res.json(targetVideo);
            } catch(err) {
                res.status(501).json({
                    Error: 'The server cannot handle your request at the moment. Please try again later.'
                });
            }
        }
    },
    postComment: (req, res) => {
        const { vidId } = req.params;
        const req_key = req.query.api_key
        let bodyReq = ['name', 'comment']
        let bodyKeys = Object.keys(req.body)
        let isValidBody = bodyReq.every(req => bodyKeys.includes(req))
        const targetVid = videos.find((vid) => vid.id === vidId);
        if (!req_key || !api_key.includes(req_key)) {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        } else if (!targetVid) {
            res.status(401).json({
                Error: 'Invalid video ID provided.'
            });
        // check if required key value pairs are provided -- name, comment
        } else if (!isValidBody) {
            res.status(401).json({
                Error: `Invalid request body. Please provide key-value pairs {name: J. Doe} and {comment: Sample comment}`
            });
        } else {
            try {
                let newComment = {
                    ...req.body, 
                    id: uuidv4(),
                    timestamp: new Date().getTime()
                };
                targetVid.comments.push(newComment);
                res.json(newComment);
                console.log('successfully added: ', newComment);
            } catch(err) {
                res.status(501).json({
                    Error: 'The server cannot handle your request at the moment. Please try again later.'
                });
            }
        }
    },
    deleteComment: (req, res) => {
        const { vidId, comId } = req.params;
        const req_key = req.query.api_key
        let targetVid = videos.find((vid) => vid.id === vidId);
        let deletedComment = targetVid.comments.find((comment) => String(comment.id) === comId)
        if (!req_key || !api_key.includes(req_key)) {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        } else if (!targetVid || !deletedComment) {
            res.status(401).json({
                Error: 'Invalid video ID or comment ID provided.'
            });
        } else {
            try {
                targetVid.comments = targetVid.comments.filter((comment) => String(comment.id) !== comId);
                res.json(deletedComment);
                console.log('successfully deleted: ', deletedComment)
            } catch(err) {
                res.status(501).json({
                    Error: 'The server cannot handle your request at the moment. Please try again later.'
                });
            }
        }
    },
    likeVideo: (req, res) => {
        const { vidId } = req.params;
        const req_key = req.query.api_key
        let targetVid = videos.find((vid) => vid.id === vidId);
        if (!req_key || !api_key.includes(req_key)) {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        } else if (!targetVid) {
            res.status(401).json({
                Error: 'Invalid video ID provided.'
            });
        } else {
            try {
                targetVid.thumbsUp += 1;
                res.json({
                    success: `thumbsUp is updated to ${targetVid.thumbsUp} of video with ID ${vidId}`
                })
            } catch(err) {
                res.status(501).json({
                    Error: 'The server cannot handle your request at the moment. Please try again later.'
                });
            }
        }
    },
    dislikeVideo: (req, res) => {
        const { vidId } = req.params;
        const req_key = req.query.api_key
        let targetVid = videos.find((vid) => vid.id === vidId);
        if (!req_key || !api_key.includes(req_key)) {
            res.status(401).json({
                Error: 'An authentication key is required. Please provide a valid API key query parameter'
            });
        } else if (!targetVid) {
            res.status(401).json({
                Error: 'Invalid video ID provided.'
            });
        } else {
            try {
                targetVid.thumbsDown += 1;
                res.json({
                    success: `thumbsUp is updated to ${targetVid.thumbsDown} of video with ID ${vidId}`
                })
            } catch(err) {
                res.status(501).json({
                    Error: 'The server cannot handle your request at the moment. Please try again later.'
                });
            }
        }
    }
}

// routes
app.get(`/videos`, callback.getVideoList);
app.get('/videos/:vidId', callback.playVideo);
app.post('/videos/:vidId/comment', callback.postComment);
app.delete('/videos/:vidId/comment/:comId', callback.deleteComment);
app.put('/videos/:vidId/likes', callback.likeVideo);
app.put('/videos/:vidId/dislikes', callback.dislikeVideo);

// start server
app.listen(port1, () => {
    console.log(`Hey human, your server is now running at port ${port1} 😏`)
})