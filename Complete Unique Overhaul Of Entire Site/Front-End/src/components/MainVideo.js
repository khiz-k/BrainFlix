import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions.js';

const limit = 150

class MainVideo extends Component {
    state = {
        isLike: false,
        isDislike: false,
        descPlus: false,
        showMore: false,
        showLess: false
    }

    // displays 150 characters max of the main video description by default if video desc is more than 150 characters
    // displays show more button if description is more than 150 characters
    // control flow is applied to show more or less characters of video description

    componentDidUpdate() {
        const description = this.props.description
        const { showMore, showLess, descPlus } = this.state
        if(description) {
            if(description.length > limit && !descPlus) {
                this.setState({
                    descPlus: true,
                    showMore: true,
                    showLess: false
                })
            } else if (description.length < limit) {
                if( (showMore && showLess) || (showMore || showLess) ) {
                    this.setState({
                        descPlus: false,
                        showMore: false,
                        showLess: false
                    })
                }
            }
        }
    }

    toggleHandler = () => {
        this.setState({
            showMore: !this.state.showMore,
            showLess: !this.state.showLess
        })
    }
    renderDescription() {
        return <p className="main-video__info">{ this.props.description.slice(0, limit) + '....' }</p>
    }
    renderFullDescription() {
        return <p className="main-video__info">{ this.props.description }</p>
    }
    renderShowMoreToggle() {
        return <div onClick={this.toggleHandler} className="show-more-toggle"><i className="material-icons">expand_more</i>SHOW MORE</div>
    }
    renderShowLessToggle() {
        return <div onClick={this.toggleHandler} className="show-more-toggle"><i className="material-icons">expand_less</i>SHOW LESS</div>
    }

    likeHandler = () => {
        if (!this.state.isLike) {
            this.props.likeHandler();
            this.setState({
                isLike: true,
            })
        }
    }

    dislikeHandler = () => {
        if (!this.state.isDislike) {
            this.props.dislikeHandler();
            this.setState({
                isDislike: true,
            })
        }
    }

    render() {
        const { mainVideo } = this.props
        // have to make a copy of the mainVideoObject, when I call abbreviateAllNums, it modifies the original data of the state of Main.js
        const mainVideoCopy = {...mainVideo}
        func.abbreviateAllNumsInObj(mainVideoCopy, 'views')
        const { id, video, image, title, views, thumbsUp, thumbsDown, channel, /* publishDate, */ subscriberCount } = mainVideoCopy

        return (
            <section id={id} className="main-video">
                {/* video player section */}
                <div className="main-video__content">
                    <video /* className="main-video__content" */ 
                        controls
                        src={ video + '?api_key=' + id}
                        type="mp4/video"
                        poster={ image }>
                    </video>
                </div>
            
                {/* video stats */}
                <div className="main-video__description">
                    <div className="description-title">{ title }</div>
                    <div className="description-reaction">
                        <p className="description-reaction__views">{ views } views</p>
                        <div className="description-reaction__icons">
                            <div className="likes">
                                <button onClick={this.likeHandler} className="likes-btn">
                                    <i className="material-icons like" style={this.state.isLike ? {'color': '#0095FF'} : null}>thumb_up</i>
                                    <span >{ thumbsUp }</span>
                                </button>
                                <span className="tooltip likes__tooltip">Love this</span>
                            </div>
                            <div className="dislikes">
                                <button onClick={this.dislikeHandler} className="dislikes-btn">
                                    <i className="material-icons dislike" style={this.state.isDislike ? {'color': 'rgb(255, 77, 77)'} : null}>thumb_down</i>
                                    <span >{ thumbsDown }</span>
                                </button>
                                    <span className="tooltip dislikes__tooltip">Dislike this</span>
                            </div>
                            <div className="share">
                                <button className="share-btn">
                                    <img src="/Assets/Icons/Share.svg" alt="Icon" /> 
                                    <span>SHARE</span>
                                </button>
                                    <span className="tooltip share__tooltip">Share this</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* video details */}
                <div className="main-video__details">
                    <div className="main-video__details-author">
                        <div className="author-details">
                            <img className="author-details__avatar" src='/Assets/Images/image10.jpg' alt="Avatar" />
                            <div className="author-details__info">
                                <p className="author-details__info-name">{ channel }</p>
                                <p className="author-details__info-date">Published on May 10, 2018</p>
                            </div>
                        </div>
                        {/* <button className="subscribe-button" type="button"><span>SUBSCRIBE</span><span>{ func.abbreviateNum(subscriberCount) }</span></button> */}
                        <button className="subscribe-button" type="button"><span>SUBSCRIBE</span><span>{ subscriberCount }</span></button>
                    </div>
                    <div className="main-video__details-info">
                        { this.props.description ? 
                            // this.state.descPlus ? this.renderDescription() : 
                            this.state.descPlus && this.state.showMore ? this.renderDescription() :
                            this.state.descPlus && !this.state.showMore ? this.renderFullDescription() : 
                            this.renderFullDescription() :
                        null }
                        { this.props.description ? 
                            this.state.descPlus && this.state.showMore ? this.renderShowMoreToggle() : 
                            this.state.descPlus && this.state.showLess ? this.renderShowLessToggle() :
                            null :
                        null }
                    </div>
                </div>
            </section>
        )
    }
}

export default MainVideo;

