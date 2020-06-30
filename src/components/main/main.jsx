import React from 'react';
import axios from "axios";
import './main.scss';
// import components
import Hero from '../hero/hero';
import Article from '../article/article';
import Comments from '../comments/comments';
import Aside from '../aside/aside';
// import assets for state
import BrainFlixLogo from '../../assets/Logo/Logo-brainflix.svg';
import UserImage from '../../assets/Images/Mohan-muruge.jpg';
import ViewsIcon from '../../assets/Icons/SVG/Icon-views.svg';
import LikesIcon from '../../assets/Icons/SVG/Icon-likes.svg';
import DefaultCommentImage from "../../assets/Images/default-image.jpg";
// API INFO
let videoID = "1af0jruup5gu";
const videosURL = "https://project-2-api.herokuapp.com/videos/?api_key=";
const mainVidURL = "https://project-2-api.herokuapp.com/videos/" + videoID + "?api_key=";
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";


class Main extends React.Component {
  state = {
    siteLogo: BrainFlixLogo,
    userIcon: UserImage,
    viewsIcon: ViewsIcon,
    likesIcon: LikesIcon,
    defaultCommentImage: DefaultCommentImage,
    mainVid: {},
    videos: [],
    comments: [],
    commentsTitleCount: 3 + " comments", // comments.length count to replace 3
  }
  componentDidMount() {
    axios.get(videosURL + API_KEY).then(
      res => this.setState({ videos: res.data })
      // setTimeout(() => window.scrollTo(0, 0), 100); scrolls to top on click
    )
    axios.get(mainVidURL + API_KEY).then(
      res => (this.setState({ comments: res.data.comments })
      )
    )
    axios.get(mainVidURL + API_KEY).then(
      res => { this.setState({ mainVid: res.data }); }
    )
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.routeProps.match.params.id !== prevProps.routeProps.match.params.id) {
    let newVideoID = this.props.routeProps.match.params.id;
    const newURL = "https://project-2-api.herokuapp.com/videos/"+newVideoID+"?api_key="; 
    axios.get(newURL + API_KEY).then( 
      res => {this.setState({mainVid: res.data}); }
      )
    }
  }
  render() {
    return (
      <main>
        <Hero id={this.state.mainVid.id} image={this.state.mainVid.image} source={this.state.mainVid.video}/>
        <div className="details">
          <div className="not-aside">
            <Article id={this.state.mainVid.id} title={this.state.mainVid.title} channel={this.state.mainVid.channel}  timestamp={this.state.mainVid.timestamp} viewsIcon={this.state.viewsIcon} views={this.state.mainVid.views} likesIcon={this.state.likesIcon} likes={this.state.mainVid.likes} description={this.state.mainVid.description}/>
            <Comments id={this.state.mainVid.id} comments={this.state.comments} title={this.state.commentsTitleCount} formImage={this.state.userIcon} defaultCommentImage={DefaultCommentImage}/>
          </div>
          <Aside videos={this.state.videos} currentlyDisplayedVideo={this.state.mainVid} />
        </div>
      </main>
    );
  }
}

export default Main;
