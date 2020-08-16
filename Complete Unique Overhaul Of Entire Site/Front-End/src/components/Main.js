import React, { Component } from 'react';
import '../styles/App.css';
import MainVideo from './MainVideo'
import VideoPlaylist from './VideoPlaylist'
import Comments from './Comments'
import * as func from './functions.js';

const API_KEY = "?api_key=12345678";
// const baseURL = 'https://project-2-api.herokuapp.com';
const baseURL = 'http://localhost:8080'

// const getVideosUrl = baseURL + '/videos?api_key=' + API_KEY;

export default class Main extends Component {
    state = {
        videos: [],
        mainVideo: {},
        isLoading: true,
    }

    componentDidMount() {
        const getVideosUrl = `${baseURL}/videos${API_KEY}`;
        func.fetchRequest('GET', getVideosUrl, (data) => {
            // console.log('VIDEOS: ', data);
            this.setState({
                videos: data
            });
        });
    }

    componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.videoId;
        const playId = this.props.match.params.videoId;
        // const URL = baseURL + '/videos/' + playId + '?api_key=' + API_KEY; 
        const URL = `${baseURL}/videos/${playId}${API_KEY}`; 
        if (!this.state.videos.find((video) => video.id === playId)) {
            this.props.history.replace('/video-not-available');
        } else if (playId !== prevId || playId !== this.state.mainVideo.id) {
            func.fetchRequest('GET', URL, (data) => {
                this.setState({
                    mainVideo: data,
                    isLoading: false,
                })
            });
        }
    }

    likeHandler = () => {
        func.fetchRequest('PUT', `${baseURL}/videos/${this.state.mainVideo.id}/likes${API_KEY}`)
        this.setState({
            mainVideo: {
                ...this.state.mainVideo,
                thumbsUp: this.state.mainVideo.thumbsUp + 1
            }
        })
    }

    dislikeHandler = () => {
        func.fetchRequest('PUT', `${baseURL}/videos/${this.state.mainVideo.id}/dislikes${API_KEY}`, (data) => {
            console.log(data);
        })
        this.setState({
            mainVideo: {
                ...this.state.mainVideo,
                thumbsDown: this.state.mainVideo.thumbsDown + 1
            }
        })
    }

    renderMainJSX() {
        return <section id="main-video-content">
            <MainVideo  mainVideo={ this.state.mainVideo } 
                        likeHandler={this.likeHandler} 
                        dislikeHandler={this.dislikeHandler}
                        description={ this.state.mainVideo.description }
                        id={ this.state.mainVideo.id } />
            <Comments comments={ this.state.mainVideo.comments } mainVideoId={ this.state.mainVideo.id }/>
        </section>  
    }

    render() {
        return (
            <main>
                { this.state.isLoading ? <div id='loading-page'><h1 >Loading......</h1></div> : null }
                { this.state.mainVideo ? this.renderMainJSX() : null }
                <VideoPlaylist playVideoId={this.state.mainVideo.id} videoPlaylist={this.state.videos} />
            </main>
        )
    }
}