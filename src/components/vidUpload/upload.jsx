import React, { Component } from 'react';
import './upload.scss';

export default function Upload(props) {
  return (
    <section className="upload">
      <h1 className="upload__title">Upload Video</h1>
      <form name="addVideo" className="add-video" id="add-video" /*action type="reset"*/>
        <div className="inputs-container">
          <div className="file-upload">
            <label htmlFor="thumbnail" className="label-text">Video Thumbnail</label>
            <input type="button" name="thumbnail" className="thumbnail" required={true} />
          </div>
          <div className="info-container">
            <label htmlFor="title" className="label-text">Title Your Video</label>
            <input type="text" name="title" className="vid-title" id="vid-title" placeholder="Add a title to your video" required={true} />
            <label htmlFor="comment-content" className="label-text">Add a Video Description</label>
            <textarea name="userComment" className="comment-content" id="comment-content" placeholder="Add a description of your video" required={true} /> 
          </div>    
        </div>
        <div className="button-container">
          <button className="cancel-button">cancel</button><input type="submit" name="postVideo" className="upload-button" id="upload-button" value="publish" />
        </div>
      </form>
    </section>
  );
}