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
// import assets
import brainflixLogo from './assets/Logo/Logo-brainflix.svg';
import userImage from './assets/Images/Mohan-muruge.jpg';

class App extends React.Component  {
  state = {
    siteLogo: brainflixLogo,
    userIcon: userImage
  }
  render () {
    return (
      <BrowserRouter>
      <div className="App">
        <header>
          <Nav logo={this.state.siteLogo} image={this.state.userIcon} />
        </header>
        {/* <Switch> */}
          <Route path="/home" component={Hero} />
          <main>
              <div className="not-aside">
              <Route path="/upload" component={Upload}/>
                <Route path="/home"> 
                  <Article />
                  <Comments />
                </Route> 
              </div>
              <Route path="/home" component={Aside} />
          </main>
        {/* </Switch> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
