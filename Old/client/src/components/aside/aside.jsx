import React from 'react';
import './aside.scss';
import { Link } from "react-router-dom";

export default function Aside (props) {
  const filteredVideosList = props.videos.filter(video => video.id !== props.currentlyDisplayedVideo.id);
  return (
    <aside className="next-video">
      <h5 className="next-video__title">Next Video</h5>
      <ul className="next-video__list">
        {filteredVideosList.map((video) => {
        return (
        <li key={video.id} className="next-video__list-item">
          <Link to={"/video/"+video.id} className="next-video__item-anchor">
            <img src={video.image} className="next-video__item-image" alt={`Video ${video.id}`}/>
            <div className="next-video__item-text">
              <h5 className="next-video__item-title">{video.title}</h5><h5 className="next-video__item-creator">{video.channel}</h5>
            </div>
          </Link>
        </li>      
        );
        })}   
      </ul>
    </aside>
  );
}