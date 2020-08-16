import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions.js';
import { Link } from 'react-router-dom';

class VideoPlaylist extends Component {
    render() {
        // passing videos data to props from API thru <Main> Component
        const { videoPlaylist, playVideoId } = this.props
        
        // call array method MAP on videoPlaylist to pass all info of each video to <VideoThumbnail> Component
        // Instantiate each <VideoThumbnail> component inside <Link> Component and set "To" prop to '/videos/{id of the each video} as our URL path of each video'
        const videoPlaylistJSX = videoPlaylist.filter( video => video.id !== playVideoId)
            .map( video => {
                return <Link to={`/video/${video.id}`} key={video.id}>
                        <VideoThumbnail 
                            key={video.id} 
                            id={video.id} 
                            /* link={video.videoLink} */ 
                            poster={video.image} 
                            duration={video.duration} 
                            title={video.title} 
                            channel={video.channel}views={func.abbreviateNum(video.views)}
                        />
                </Link>
            })
        
        return (
            <aside className="video-playlist">
                <p className="video-playlist__text">Up Next</p>
                <div className="video-block">
                    {videoPlaylistJSX}
                </div>
            </aside>
        )
    }
}


class VideoThumbnail extends Component {
    render() {

        const { id, /* link, */ poster, duration, title, channel, views} = this.props;

        return (
            <li id={id} className="video-box">
                <div className="video-box__thumbnail">
                    <div className="video-box__thumbnail-content">
                        {/* <video className='thumbnail-poster'
                            src={ link } 
                            alt="Video Sample" 
                            poster={ poster }
                            /> */}
                        <img className='thumbnail-poster' src={ poster } alt={ title } />
                        <span>{duration}</span>
                    </div>
                    <div className="video-box__thumbnail-description">
                        <p>{title}</p>
                        <p>{channel}</p>
                        <p>{views} views</p>
                    </div>
                </div>
                <i className="material-icons more_vert">more_vert</i>
            </li>
        )
    }
}

export default VideoPlaylist;