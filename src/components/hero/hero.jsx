import React, { Component } from 'react';
import './hero.scss';
import axios from 'axios';
import sampleVid from '../../assets/Video/BrainStation Sample Video.mp4';

const url = "https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

const VideoComponent = ({videoPlayer, changePoster, changeSource}) => {
  return (
    <>
      <video key={videoPlayer.id} className="hero-video" poster={videoPlayer.image} controls onChange={changePoster}>
        <source src={sampleVid} type="video/mp4" className="video-source" onChange={changeSource}/>
      </video>
    </>
  )
}

export default class Hero extends Component {
  state = {
    videoPlayer: []
  };
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({videoPlayer: res.data})
    )
  }
  changePoster = event => this.setState({poster: event.target.value})
  changeSource = event => this.setState({source: event.target.value})
  render() {
    return (
      <section className="hero">
        <VideoComponent videoPlayer={this.state.videoPlayer} changePoster={() => this.changePoster} changeSource={() => this.changeSource} />
      </section>
    )
  }
}