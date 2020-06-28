import React, { Component } from 'react';
import './aside.scss';
import axios from 'axios';

const url = "https://project-2-api.herokuapp.com/videos?api_key="; 
const urlMain = "https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

const VideoList = ({videos, changeVid}) => {
  return (
    <>
      {videos.map(video => <li key={video.id} className="next-video__list-item" onClick={() => changeVid(video.id)}>
        <a href="./" className="next-video__item-anchor">
          <img src={video.image} className="next-video__item-image" alt="List Video"/>
          <div className="next-video__item-text">
            <h5 className="next-video__item-title">{video.title}</h5><h5 className="next-video__item-creator">{video.channel}</h5>
          </div>
        </a>
      </li>)}    
    </>
  )
}

export default class Aside extends Component {
  state = {
    videos: [],
    mainVidID : {}
  };
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({videos: res.data})
    )
  }
  getMainVidID() {
    axios.get(urlMain + API_KEY).then(
      res => this.setState({mainVidID: res.data.id})
    )
  }
  render() {
    return (
      <aside className="next-video">
        <h5 className="next-video__title">Next Video</h5>
        <ul className="next-video__list">
          <VideoList videos={this.state.videos} changeVid={this.changeVid} />
        </ul>
      </aside>
    )
  }
}