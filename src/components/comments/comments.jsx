import React from 'react';
import './comments.scss';

export default function Comments (props) {
  // const commentsId = props.match.params.id;
  // console.log(props)
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
    // // update time every min
    // setTimeout(timeAgo, 60000);
  };
  const submitHandler = (e) => e.preventDefault();
  return (
    <section className="comment-section">
      <h3 className="comment-section__title" >{props.title}</h3>
      <div className="comment-section__content">
        <div className="form-container">
          <img src={props.formImage} className="form-image" alt="User" />
          <form name="addComment" className="add-comment" id="add-comment" onSubmit={submitHandler}>
            <div className="form--input"> 
              <label htmlFor="textarea-content" className="label-text" >{props.label}</label>
              <textarea name="userComment" className="textarea-content" id="textarea-content" placeholder="Add a new comment" required={true} /> 
            </div> 
            <div className="submit-container">
              <input type="submit" name="postComment" className="button" id="button" value="comment" />
            </div>
          </form>
        </div>
        <div className="comment-container">
          {props.comments.map((comment) => <div key={comment.id} className="comment" >
            <img src={props.defaultCommentImage} className="comment__image" alt="Default" />
            <div className="comment__text">
              <div className="comment__title">
                <h5 className="comment__name">{comment.name}</h5><h5 className="comment__timestamp">{timeAgo(comment.timestamp)}</h5>
              </div>
              <p className="comment__paragraph">{comment.comment}</p>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  )
}
