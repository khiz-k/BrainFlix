import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import components
import Nav from './components/nav/nav';
import Main from './components/main/main';
import Upload from './components/vidUpload/upload';
// import assets
import BrainFlixLogo from './assets/Logo/Logo-brainflix.svg';
import UserImage from './assets/Images/Mohan-muruge.jpg';

class App extends React.Component  {
  render () {
    return (
      <BrowserRouter>
      <div className="App">
          <Nav logo={BrainFlixLogo} image={UserImage}/>
        <Switch>
          <Route path="/upload" component={Upload}/>
          <Route 
            path="/" exact
            render={(routeProps) => <Main {...routeProps} />}
          />
          <Route 
            path="/video/:id"
            render={(routeProps) => <Main {...routeProps} />}
          />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
