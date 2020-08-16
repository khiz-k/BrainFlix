import React, { Component } from 'react';
import './upload.scss';
import axios from 'axios';

export default class Upload extends Component {
  state = {
    id: `${Math.floor(Math.random() * 10000) + 1}`, 
    title: '',
    channel: 'Mohan Muruge',
    image: '',
    description: ''
  }
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const myServerVideosURL = "http://localhost:3000/videos";
    axios.post(myServerVideosURL, this.state).then(
      res => {
        console.log(res)
    })
    .catch(err => {
      console.log(err);
    })
    const form = e.target;
    form.reset();
  }
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  render () {
    return (
      <section className="upload">
        <h1 className="upload__title">Upload Video</h1>
        <form name="addVideo" className="add-video" id="add-video" value={this.state.id} onSubmit={this.submitHandler} >
          <div className="inputs-container">
            <div className="file-upload">
              <label htmlFor="thumbnail" className="label-text">Video Thumbnail</label>
              <input type="text" name="image" className="thumbnail" id="thumbnail" placeholder="Click to provide the image path" value={this.state.image} onChange={this.changeHandler} />
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
