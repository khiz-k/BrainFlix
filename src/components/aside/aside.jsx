import React, { Component } from 'react';
import './aside.scss';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const url = "https://project-2-api.herokuapp.com/videos?api_key="; 
const urlMain = "https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

const VideoList = (props) => {
  // does props.match exist, if it does set to &&
  let currentVidID = props.match && props.match.params.id;
  let filteredVideos = props.videos.filter(video => video !== currentVidID );
  return (
    <>
      {filteredVideos.map(video => <li key={video.id} className="next-video__list-item">
        <Link to={"/video/"+video.id} className="next-video__item-anchor">
          <img src={video.image} className="next-video__item-image" alt={`Video ${video.id}`}/>
          <div className="next-video__item-text">
            <h5 className="next-video__item-title">{video.title}</h5><h5 className="next-video__item-creator">{video.channel}</h5>
          </div>
        </Link>
      </li>)}    
    </>
  )
}

export default class Aside extends Component {
  state = {
    videos: [],
    currentVideo: {id: '1af0jruup5gu'}
  };
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({videos: res.data})
    )
    // axios.get(urlMain + API_KEY).then(
    //   res => this.setState({currentVideo: res.data})
    //   )
  }
  render() {
    return (
      <aside className="next-video">
        <h5 className="next-video__title">Next Video</h5>
        <ul className="next-video__list">
          <VideoList id={this.state.currentVideo.id} videos={this.state.videos} changeVid={this.changeVid} />
        </ul>
      </aside>
    )
  }
}