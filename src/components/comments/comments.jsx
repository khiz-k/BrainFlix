import React, { Component } from 'react';
import './comments.scss';
// import title from '';
import userImage from '../../assets/Images/Mohan-muruge.jpg';
import defaultCommentImage from "../../assets/Images/default-image.jpg";
// import name from '';
// import timestamp from '';
// import paragraph from '';

const TitleComponent = ({title, changeTitle}) => {
  return (
    <>
      <h3 className="comment-section__title" onChange={changeTitle}>{title}</h3>
    </>
  )
}

const FormComponent = ({image, label, changeImage, changeLabel}) => {
  // name & comment needs to be captured and pushed, need to use onsubmit
  return (
    <>
      <div className="form-wrap">
        <img src={image} className="form-image" alt="User" onChange={changeImage} />
        <div className="form-container">
          <form name="addComment" className="add-comment" id="add-comment" action type="reset">
            {/* <label for="user__name" class="label-text">Name</label>
                <input type="text" name="userName" class="username" id="username" placeholder="Enter your name" required="true"> */}
            <div className="form--input"> 
              <label htmlFor="textarea-content" className="label-text" onChange={changeLabel}>{label}</label>
              <textarea name="userComment" className="textarea-content" id="textarea-content" placeholder="Add a new comment" required="true" defaultValue={""} /> 
            </div> 
            <div className="submit-container">
              <input type="submit" name="postComment" className="button" id="button" defaultValue="comment" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const CommentComponent = ({image, name, timestamp, paragraph, changeImage, changeName, changeTimestamp, changeParagraph}) => {
  return (
    <>
       <div className="comment">
          <img src={image} className="comment__image" alt="Default" onChange={changeImage} />
          <div className="comment__text">
            <div className="comment__title">
              <h5 className="comment__name" onChange={changeName}>{name}</h5><h5 className="comment__timestamp" onChange={changeTimestamp}>{timestamp}</h5>
            </div>
              <p className="comment__paragraph" onChange={changeParagraph}>{paragraph}</p>
          </div>
        </div>
    </>
  )
}

export default class Comments extends Component {
  state = {
    title: 'placeholder',
    image: userImage,
    label: 'Join The Conversation',
    defaultImage: defaultCommentImage,
    name: 'placeholder',
    timestamp: 'placeholder',
    paragraph: 'placeholder'
  };
  changeTitle = event => this.setState({title: event.target.value})
  changeImage = event => this.setState({image: event.target.value})
  changeName = event => this.setState({image: event.target.value})
  changeTimestamp = event => this.setState({title: event.target.value})
  changeParagraph = event => this.setState({image: event.target.value})
  render() {
    return (
        <section className="comment-section">
        <TitleComponent title={this.state.title} changeTitle={() => this.changeTitle} />
        <div className="comment-section__content">
          <FormComponent image={this.state.image} label={this.state.label} changeImage={() => this.changeImage} changeLabel={() => this.changeLabel} />
          <div className="comment-container">
<!--             <CommentComponent image={this.state.image} name={this.state.name} timestamp={this.state.timestamp} paragraph={this.state.paragraph} changeImage={() => this.changeImage} changeName={() => this.changeName} changeTimestamp={() => this.changeTimestamp} changeParagraph={() => this.changeParagraph} /> -->
            <div className="comment">
              <img src={this.state.defaultImage} className="comment__image" alt="Default" />
              <div className="comment__text">
                <div className="comment__title">
                  <h5 className="comment__name">Theodore Duncan</h5><h5 className="comment__timestamp">23 months ago</h5>
                </div>
                <p className="comment__paragraph">How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!</p>
              </div>
            </div>
            <div className="comment">
              <img src={this.state.defaultImage} className="comment__image" alt="Default" />
              <div className="comment__text">
                <div className="comment__title">
                  <h5 className="comment__name">Gary Wong</h5><h5 className="comment__timestamp">23 months ago</h5>
                </div>
                <p className="comment__paragraph">Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!</p>
              </div>
            </div>
            <div className="comment">
              <img src={this.state.defaultImage} className="comment__image" alt="Default" />
              <div className="comment__text">
                <div className="comment__title">
                  <h5 className="comment__name">Micheal Lyons</h5><h5 className="comment__timestamp">23 months ago</h5>
                </div>
                <p className="comment__paragraph">They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of acconcert I have EVER witnessed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
