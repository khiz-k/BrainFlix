import React from 'react';
import './article.scss';

export default function Article (props) {
  let descriptionDate = `${props.timestamp}`; 
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
      <article className="description">
        <div key={props.id} className="description">
          <h3 className="description__title" >{props.title}</h3>
          <div className="description__top">
            <div className="description__sub-title">
            <h5 className="description__name" >{props.channel}</h5><h5 className="description__timestamp" >{dateFormatted}</h5>
            </div>
            <div className="description__stats">
            <img src={props.viewsIcon} alt="Views Icon" className="views-icon" /><h5 className="views" >{props.views}</h5><img src={props.likesIcon} alt="Likes Icon" className="likes-icon" /><h5 className="likes">{props.likes}</h5>
            </div>
          </div>    
          <p className="description__paragraph">{props.description}</p>
        </div>
      </article>
    </>
  );
}