import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import './App.scss';
// import components
import Nav from './components/nav/nav';
import Hero from './components/hero/hero';
import Article from './components/article/article';
import Comments from './components/comments/comments';
import Aside from './components/aside/aside';
import Upload from './components/vidUpload/upload';
// import assets for state
import BrainFlixLogo from './assets/Logo/Logo-brainflix.svg';
import UserImage from './assets/Images/Mohan-muruge.jpg';
import SampleVid from './assets/Video/BrainStation Sample Video.mp4';
import viewsIcon from './assets/Icons/SVG/Icon-views.svg';
import likesIcon from './assets/Icons/SVG/Icon-likes.svg';
// API INFO
let videoID = "1af0jruup5gu";
const url = "https://project-2-api.herokuapp.com/videos/"+videoID+"?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

class App extends React.Component  {
  state = {
    siteLogo: BrainFlixLogo,
    userIcon: UserImage, 
    mainVid: [],
    vidSource: SampleVid, 
    viewsIcon: viewsIcon,
    likesIcon: likesIcon
  }
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({mainVid: res.data})
    )
  }
  // componentDidUpdate() {
  // }
  render () {
    return (
      <BrowserRouter>
      <div className="App">
        <header>
          <Nav logo={this.state.siteLogo} image={this.state.userIcon} />
        </header>
        <Switch>
          <main>
            <Route path="/" exact >
              <Hero id={this.state.mainVid.id} image={this.state.mainVid.image} source={this.state.vidSource} />
            </Route>
            <Route path="video/:id" exact >
              <Hero id={this.state.mainVid.id} image={this.state.mainVid.image} source={this.state.vidSource} />
            </Route>
            <div className="details">
              <div className="not-aside">
                <Route path="/upload" component={Upload}/>
                <Route path="/" exact > 
                  <Article id={this.state.mainVid.id} title={this.state.mainVid.title} channel={this.state.mainVid.channel}  timestamp={this.state.mainVid.timestamp} viewsIcon={this.state.viewsIcon} views={this.state.mainVid.views} likesIcon={this.state.likesIcon} likes={this.state.mainVid.likes} description={this.state.mainVid.description}/>
                  <Comments />
                </Route> 
                <Route path="/video:id" exact > 
                <Article id={this.state.mainVid.id} title={this.state.mainVid.title} channel={this.state.mainVid.channel}  timestamp={this.state.mainVid.timestamp} viewsIcon={this.state.viewsIcon} views={this.state.mainVid.views} likesIcon={this.state.likesIcon} likes={this.state.mainVid.likes} description={this.state.mainVid.description}/>
                  <Comments />
                </Route> 
              </div>
              <Route path="/" exact >
                <Aside videoPlayer={this.state.videoPlayer} />
              </Route>
              <Route path="video/:id" exact >
                <Aside videoPlayer={this.state.videoPlayer} />
              </Route>
            </div>
          </main>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
