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
import ViewsIcon from './assets/Icons/SVG/Icon-views.svg';
import LikesIcon from './assets/Icons/SVG/Icon-likes.svg';
import DefaultCommentImage from "./assets/Images/default-image.jpg";
// API INFO
const videosURL = "https://project-2-api.herokuapp.com/videos/?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

class App extends React.Component  {
  state = {
    siteLogo: BrainFlixLogo,
    userIcon: UserImage, 
    mainVid: {},
    viewsIcon: ViewsIcon,
    likesIcon: LikesIcon,
    defaultCommentImage: DefaultCommentImage,
    videos: []
  }
  componentDidMount() {
    axios.get(videosURL + API_KEY).then(
      res => this.setState({videos: res.data})
    )
  }
  componentDidUpdate(prevProps, prevState){
    let videoID=this.state.mainVid.id || "1af0jruup5gu";
    const mainVidURL = "https://project-2-api.herokuapp.com/videos/"+videoID+"?api_key="+API_KEY; 
    
    // if(videoID != prevState.mainVid.id) {
    //   console.log("fire");
      

      axios.get(mainVidURL).then( 
      res => {this.setState({mainVid: res.data}); }
      )
    // }
    // console.log('Video Player Updated', this.state.mainVid)
  }
  render () {
    return (
      <BrowserRouter>
      <div className="App">
        <header>
          <Nav logo={this.state.siteLogo} image={this.state.userIcon} />
        </header>
        <Switch>
          <main>
            {/* <Route path="/" exact > 
            <Hero id={this.state.mainVid.id} image={this.state.mainVid.image} source={this.state.mainVid.video}/>
            </Route>  */}
            <Route
              path="/video/:id"
              render={(routeProps) => <Hero id={this.state.mainVid.id} image={this.state.mainVid.image} source={this.state.mainVid.video} {...routeProps} /> }  
            />         
            <div className="details">
              <div className="not-aside">
                <Route path="/upload" component={Upload}/>
                <Route path="/" exact > 
                  <Article id={this.state.mainVid.id} title={this.state.mainVid.title} channel={this.state.mainVid.channel}  timestamp={this.state.mainVid.timestamp} viewsIcon={this.state.viewsIcon} views={this.state.mainVid.views} likesIcon={this.state.likesIcon} likes={this.state.mainVid.likes} description={this.state.mainVid.description}/>
                  <Comments />
                </Route> 
                <Route
                  path="/video/:id"
                  render={(routeProps) => <Article id={this.state.mainVid.id} title={this.state.mainVid.title} channel={this.state.mainVid.channel}  timestamp={this.state.mainVid.timestamp} viewsIcon={this.state.viewsIcon} views={this.state.mainVid.views} likesIcon={this.state.likesIcon} likes={this.state.mainVid.likes} description={this.state.mainVid.description} {...routeProps} /> }  
                />
                <Route
                  path="/video/:id"
                  render={(routeProps) => <Comments id={this.state.mainVid.id} {...routeProps} /> }  
                />            
              </div>
              <Route path="/" exact >
                <Aside  />
              </Route>
              <Route
                path="/video/:id"
                render={(routeProps) => <Aside videos={this.state.videos} {...routeProps} />}
              />
            </div>
          </main>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
