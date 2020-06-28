import React, { Component } from 'react';
import './upload.scss';

export default class Upload extends Component {
  render() {
    return (
      <section className="upload">
        <h2 className="upload-title">Upload Video</h2>
        <form name="addVideo" className="add-video" id="add-video" /*action type="reset"*/>
          <div className="inputs-container">
            <div className="file-upload">
              <label htmlFor="thumbnail" className="label-text">Video Thumbnail</label>
              <input type="button" name="thumbnail" className="thumbnail" required={true} />
            </div>
            <div className="name-comment">
              <label htmlFor="user__name" className="label-text">Name</label>
              <input type="text" name="userName" className="username" id="username" placeholder="Add a title to your video" required={true} />
              <label htmlFor="comment-content" className="label-text">Add a Video Description</label>
              <textarea name="userComment" className="comment__content" id="comment__content" placeholder="Add a description of your video" required={true} /> 
            </div>    
          </div>
          <div className="button-container">
            <button className="cancel-button">cancel</button><input type="submit" name="postVideo" className="upload-button" id="upload-button" defaultValue="upload" />
          </div>
        </form>
      </section>
    )
  }
}
