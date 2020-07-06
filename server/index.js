const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');
const videoList = require ("./listData.json");
const mainVid = require ("./mainData/mainData.json");
const video0 = require ("./mainData/video0-1af0jruup5gu.json");
const video1 = require ("./mainData/video1-1ainjruutd1j.json");
const video2 = require ("./mainData/video2-1aivjruutn6a.json");
const video3 = require ("./mainData/video3-1a3cjruucpf7.json");
const video4 = require ("./mainData/video4-1am3jruuwagz.json");
const video5 = require ("./mainData/video5-1akljruuvhzt.json");
const video6 = require ("./mainData/video6-1ae5jruuoc4q.json");
const video7 = require ("./mainData/video7-1a4kjruuedd9.json");
const video8 = require ("./mainData/video8-1a8qhruuzky3.json");


app.use(cors());
app.use(bodyParser.urlencoded())

// app.get(`videos/:id`, (req, res) => {
//   const sendVideo = mainVid.find(item => item.id === req.params.videoId);
//   res.send(sendVideo);
// })
app.get('/videos/undefined', (req,res) => {
  res.send(video0);
})
app.get('/videos/1af0jruup5gu', (req,res) => {
  res.send(video0);
})
app.get('/videos/1ainjruutd1j', (req,res) => {
  res.send(video1);
})
app.get('/videos/1aivjruutn6a', (req,res) => {
  res.send(video2);
})
app.get('/videos/1a3cjruucpf7', (req,res) => {
  res.send(video3);
})
app.get('/videos/1am3jruuwagz', (req,res) => {
  res.send(video4);
})
app.get('/videos/1akljruuvhzt', (req,res) => {
  res.send(video5);
})
app.get('/videos/1ae5jruuoc4q', (req,res) => {
  res.send(video6);
})
app.get('/videos/1a4kjruuedd9', (req,res) => {
  res.send(video7);
})
app.get('/videos/1a8qhruuzky3', (req,res) => {
  res.send(video8);
})
app.get('/videos', (req,res) => {
  res.send(videoList);
})
app.get('/upload', (req, res) => {
    res.redirect('/')
})
app.get('/webpage', (req, res) => {
  res.sendFile('/public/index.html', {root: __dirname});
})
app.post('/videos', (req, res) => {
    if (!req.body.message) return res.status(401).json({reply: "add a message property"})
    videoList.push(req.body.message)
    res.send(videoList);
})

app.listen(3000, (err) => {
    if (err) {
        console.error(err)
        return
    };
    console.info('running on 3000');
});
