import React, { Component } from 'react';
import './upload.scss';

export default class Upload extends Component {
  state = {
    id: '', // randomize
    title: '',
    channel: 'Mohan Muruge',
    image: '',
    description: ''
  }
  submitHandler = (e) => {
    e.preventDefault();
    this.setState({[e.target.videoId]: Math.floor((Math.random() * 1000) + 1)});
    console.log(this.state);

    // idValue = "2af1jruup4gu";
    // titleValue = e.target.title.value;
    // channelValue = "Mohan Muruge";
    // imageValue = e.target.thumbnail.value;
    // descriptionValue = e.target.userDescription.value;

    // let videoObject = {title: titleValue, channel: channelValue, image: imageValue, description: descriptionValue, timestamp: Date.now(), video: videoValue};

    // postVideo(videoObject.id, videoObject.title, videoObject.channel, videoObject.image, videoObject.description);

    // e.reset();
  }
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render () {
    return (
      <section className="upload">
        <h1 className="upload__title">Upload Video</h1>
        <form name="addVideo" className="add-video" id="add-video" value={this.state.videoId} onSubmit={this.submitHandler} >
          <div className="inputs-container">
            <div className="file-upload">
              <label htmlFor="thumbnail" className="label-text">Video Thumbnail</label>
              <input type="text" name="thumbnail" className="thumbnail" id="thumbnail" placeholder="" value={this.state.image} onChange={this.changeHandler} />
            </div>
            <div className="info-container">
              <label htmlFor="title" className="label-text">Title Your Video</label>
              <input type="text" name="title" className="vid-title" id="vid-title" placeholder="Add a title to your video" required={true} value={this.state.title} onChange={this.changeHandler}/>
              <label htmlFor="description" className="label-text">Add a Video Description</label>
              <textarea type="text" name="description" className="description-content" id="description-content" placeholder="Add a description of your video" required={true} value={this.state.description} onChange={this.changeHandler}/> 
            </div>    
          </div>
          <div className="buttons-container">
            <button className="cancel-button">cancel</button><input type="submit" name="postVideo" className="upload-button" id="upload-button" value="publish" />
          </div>
        </form>
      </section>
    )
  }
}