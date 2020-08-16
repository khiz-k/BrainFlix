import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import Main from './Main'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import UploadPage from './UploadPage';
import VideoNotAvailable from './VideoNotAvailable';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
            <Header />
            <Switch>
              <Route path='/upload' exact component={ UploadPage } />
              <Route path='/' exact render={ () => <Redirect to='/video/ef12341tr2' />} />
              <Route path='/video/:videoId' render={ (props) => <Main {...props} /> } />
              <Route path='/video-not-available' component={VideoNotAvailable} />
              <Route path='/' render={ () => <Redirect to='/video-not-available' />} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
