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
const myServerVideosURL = "http://localhost:3000/videos";
const myServerDefaultMainVidURL = "http://localhost:3000/videos/"+videoID;


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
    commentsTitleCount: 3 + " comments", // comments.length replaces 3
  }
  componentDidMount() {
    axios.get(myServerVideosURL).then(
      res => this.setState({ videos: res.data })
        // setTimeout(() => window.scrollTo(0, 0), 100)
    )
    .catch(err => {
      console.log(err);
    })
    axios.get(myServerDefaultMainVidURL).then(
      res => (this.setState({ comments: res.data.comments })
      )
    )
    .catch(err => {
      console.log(err);
    })
    if (this.props.match.params.id == this.props.match.params.id) {
      axios.get(myServerDefaultMainVidURL).then( 
        res => { this.setState({ mainVid: res.data }); }
      )
      .catch(err => {
        console.log(err);
      })
    
    } else {      
      let newVideoID = this.props.match.params.id;
      const myServerNewMainVidURL = "http://localhost:3000/videos/"+newVideoID;
      axios.get(myServerNewMainVidURL).then( 
        res => {this.setState({mainVid: res.data}); }
      )
      .catch(err => {
        console.log(err);
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.match.params.id !== prevProps.match.params.id) {
      let newVideoID = this.props.match.params.id;
      const myServerNewMainVidURL = "http://localhost:3000/videos/"+newVideoID;
      axios.get(myServerNewMainVidURL).then( 
        res => {this.setState({mainVid: res.data}); }
      )
      .catch(err => {
        console.log(err);}
      )
    }
    //else
      // axios.post(videosURL + API_KEY).then(
      //   res => {this.setState({ videos: res.data }); }
      // )
      // .catch(err => {
      //   console.log(err);}
      // )
      // postComments = (userName, userComment) => {
      //   axios.post(url + API_KEY, {
      //     name: userName,
      //     comment: userComment
      //     })
      //     .then(res => {
      //     console.log(res.data)
      //     })
      //     .catch(err => {
      //       console.log(err);}
      //     )
      // };
  }
  render() {
    return (
      <main>
        <Hero id={this.state.mainVid.id} mainVid={this.state.mainVid}/>
        <div className="details">
          <div className="not-aside">
            <Article mainVid={this.state.mainVid} viewsIcon={this.state.viewsIcon} likesIcon={this.state.likesIcon}/>
            <Comments id={this.state.mainVid.id} comments={this.state.comments} title={this.state.commentsTitleCount} formImage={this.state.userIcon} defaultCommentImage={DefaultCommentImage} />
          </div>
          <Aside videos={this.state.videos} currentlyDisplayedVideo={this.state.mainVid} />
        </div>
      </main>
    );
  }
}

export default Main;
