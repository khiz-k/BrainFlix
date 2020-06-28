import React, { Component } from 'react';
import './article.scss';
import axios from 'axios';
import viewsIcon from '../../assets/Icons/SVG/Icon-views.svg';
import likesIcon from '../../assets/Icons/SVG/Icon-likes.svg';

const url = "https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

const DescriptionComponent = ({description, viewsIcon, likesIcon, changeViews, increaseLikes}) => {
  let descriptionDate = `${description.timestamp}`; 
  const timeAgo = (date) => {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
    return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
    return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
    return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
    return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
    return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";

    // update time every min
    setTimeout(timeAgo, 60000);
};
let dateFormatted = timeAgo(descriptionDate);
  return (
    <>
      <div key={description.id} className="description">
        <h3 className="description__title" >{description.title}</h3>
        <div className="description__top">
          <div className="description__sub-title">
          <h5 className="description__name" >{description.channel}</h5><h5 className="description__timestamp" >{dateFormatted}</h5>
          </div>
          <div className="description__stats">
          <img src={viewsIcon} alt="Views Icon" className="views-icon" /><h5 className="views" >{description.views}</h5><img src={likesIcon} alt="Likes Icon" className="likes-icon" onClick={increaseLikes}/><h5 className="likes">{description.likes}</h5>
          </div>
        </div>    
        <p className="description__paragraph">{description.description}</p>
      </div>
    </>
  )
}

export default class Article extends Component {
  state = {
    mainVidArticle: [],
    viewsIcon: viewsIcon,
    likesIcon: likesIcon,
  };
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({mainVidArticle: res.data})
    )
  }
  changeViews = event => this.setState({views: event.target.value})
  increaseLikes = event => this.setState({likes: event.target.value+1})
  render() {
    return (
      <article className="description">
        <DescriptionComponent description={this.state.mainVidArticle} viewsIcon={this.state.viewsIcon} likesIcon={this.state.likesIcon} changeDescription={this.changeDescription} onclick={this.state.increaseLikes}/>
      </article>
    )
  }
}