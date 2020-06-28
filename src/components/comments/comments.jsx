import React, { Component } from 'react';
import './comments.scss';
import axios from 'axios';
import userImage from '../../assets/Images/Mohan-muruge.jpg';
import defaultCommentImage from "../../assets/Images/default-image.jpg";

const url = "https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key="; 
let API_KEY = "7741224a-2544-4acd-945c-a52d003ff057";

const TitleComponent = ({title, changeTitle}) => {
  return (
    <>
      <h3 className="comment-section__title" onChange={changeTitle}>{title}</h3>
    </>
  )
}

const FormComponent = ({image, label, submitHandler, changeImage, changeLabel}) => {
  // name & comment needs to be captured and pushed, need to use onsubmit
  return (
    <>
      <div className="form-container">
        <img src={image} className="form-image" alt="User" onChange={changeImage} />
        <form name="addComment" className="add-comment" id="add-comment" onSubmit={submitHandler}>
          <div className="form--input"> 
            <label htmlFor="textarea-content" className="label-text" onChange={changeLabel}>{label}</label>
            <textarea name="userComment" className="textarea-content" id="textarea-content" placeholder="Add a new comment" required={true} defaultValue={""} /> 
          </div> 
          <div className="submit-container">
            <input type="submit" name="postComment" className="button" id="button" value="comment" />
          </div>
        </form>
      </div>
    </>
  )
}

const CommentsList = ({comments, image, changeComment}) => {
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
  return (
    <>
      {comments.map((comment) => <div key={comment.id} className="comment" >
        <img src={image} className="comment__image" alt="Default" />
        <div className="comment__text">
          <div className="comment__title">
            <h5 className="comment__name">{comment.name}</h5><h5 className="comment__timestamp">{timeAgo(comment.timestamp)}</h5>
          </div>
          <p className="comment__paragraph">{comment.comment}</p>
        </div>
      </div>)}
    </>
  )
}

export default class Comments extends Component {
  state = {
    comments: [],
    title: 3 + " comments", // add a comments.length count here to replace 3
    user: userImage,
    image: defaultCommentImage
  };
  componentDidMount() {
    axios.get(url + API_KEY).then(
      res => this.setState({comments: res.data.comments})
    )
  }
  // changeTitle = event => this.setState({title: event.target.value}) example func
  render() {
    return (
      <section className="comment-section">
        <TitleComponent title={this.state.title} changeTitle={() => this.changeTitle} />
        <div className="comment-section__content">
          <FormComponent image={this.state.user} label={this.state.label} submitHandler={(event) => event.preventDefault()}  changeImage={() => this.changeImage} changeLabel={() => this.changeLabel} />
          <div className="comment-container">
            <CommentsList image={this.state.image} comments={this.state.comments} /> 
          </div>
        </div>
      </section>
    )
  }
}
