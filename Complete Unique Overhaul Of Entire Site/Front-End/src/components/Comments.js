import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions.js';


// const API_KEY = "49182a8e-e774-40de-b86c-e6df77ce2404";
// const baseURL = 'https://project-2-api.herokuapp.com';
const baseURL = 'http://localhost:8080'
const API_KEY = "?api_key=12345678";

export default class Comments extends Component {
    state = {
        mainVideoId: '',
        comments: [],
        isAddingComment: false
    }

    componentDidUpdate() {
        if(this.state.mainVideoId !== this.props.mainVideoId) {
            this.setState({
                mainVideoId: this.props.mainVideoId,
                comments: this.props.comments,
            })
        }
    }

    deleteCommentHandler = (childId) => {
        const deleteURL = `${baseURL}/videos/${this.state.mainVideoId}/comment/${childId}${API_KEY}`;
        func.fetchRequest('DELETE', deleteURL, (data) => {
            this.setState({
                comments: this.state.comments.filter(comment => comment.id !== data.id)
            })
        })
    }

    toggleCommentForm = () => {
        this.setState({ isAddingComment: !this.state.isAddingComment });
        this.commentInput.value = '';
    }

    submitCommentHandler = () => {
        const commentURL = `${baseURL}/videos/${this.props.mainVideoId}/comment${API_KEY}`;
        if (this.commentInput.value) {
            const comment = {
                name: 'John Dillon',
                comment: this.commentInput.value
            }
            func.fetchRequest('POST', commentURL, (data) => {
                this.setState({
                    comments: this.state.comments.concat(data),
                })
            }, comment)
            this.commentInput.value = ''
        }
        this.toggleCommentForm();
    }

    renderCommentForm() {
        return <form className="comments-form__input" >
            <input className="comments-form__input-shown" type="text" name="commentInput"  ref={input => (this.commentInput = input)} placeholder="Add a public comment..." required />
            <div className="comments-form__input-buttons">
                <button className="cancelBtn" type="button" onClick={this.toggleCommentForm}>CANCEL</button>
                <button className="addBtn" type="button" onClick={this.submitCommentHandler}>COMMENT</button>
            </div>
        </form>
    }

    renderAddCommentInput() {
        return <form className="comments-form__input">
        <input ref={input => (this.commentInput = input)} className="comments-form__input-hidden" onClick={this.toggleCommentForm} type="text" name="commentInput" placeholder="Add a public comment..." />
        </form>
    }

    render() {
        // debugger;
        const comments = this.state.comments;
        const commentsJSX = [];
        if (comments) {
            for (let i = comments.length - 1, index = 0; i >= 0; i--) {
                commentsJSX.push(<CommentBlock 
                    deleteCommentHandler={this.deleteCommentHandler} 
                    commentId={comments[i].id} 
                    key={comments[i].id} 
                    id={comments[i].id} 
                    index={index} 
                    userName={comments[i].name} 
                    timestamp={comments[i].timestamp} 
                    comment={comments[i].comment} />)
                index++
            }
        }

        // const commentsJSX = this.state.comments.map( (comment, index) => {
        //     return <CommentBlock key={comment.id} id={comment.id} index={index} /* userAvatar={comment.userAvatar}  */userName={comment.name} timestamp={comment.timestamp} comment={comment.comment} />
        // }) 

        return (
            <section className="comments-list">
                <div className="comments-form">
                    <img className="comments-form__avatar" src="/Assets/Images/profile-avatar.jpg" alt="Profile Avatar" />
                    { !this.state.isAddingComment ? this.renderAddCommentInput() : this.renderCommentForm() }
                </div>
                { commentsJSX }
            </section>
        )
    }
}

// Child Component CommentBlock ------------------------------------------------------------------------------------------------

class CommentBlock extends Component { 
    state = {
        commentId: '',
        showDeleteBtn: false,
        showConfirmationWindow: false,
    }

    componentDidUpdate() {
        if (this.state.commentId !== this.props.id) {
            this.setState({
                commentId: this.props.id,
            })
        } 
    }

    deleteCommentHandler = () => {
        this.props.deleteCommentHandler(String(this.state.commentId));
        this.displayConfirmWindow(false);
    }

    displayDeleteButton = (bool) => {
        this.setState({
            showDeleteBtn: bool,
        })
    }
    
    displayConfirmWindow = (bool) => {
        this.setState({
            showConfirmationWindow: bool,
        })
    }

    renderDeleteConfirmationWindow() {
        return <div className='comment-block__confirmation'>
            <div>
                <span>Are you sure you want to delete this comment?</span>
                <button onClickCapture={this.deleteCommentHandler}>Yes</button>
                <button onClick={() => this.displayConfirmWindow(false)}>No</button>
            </div>
        </div>
    }

    renderDeleteButton() {
        return <span><i onClickCapture={() => this.displayConfirmWindow(true)} className="material-icons comment-block__delete">delete_forever</i></span>
    }

    render() {
        const { id, userName, timestamp, comment } = this.props;
        
        return (
            <li ref={li => (this.commentBlock = li)} id={id} className="comment-block" onMouseOver={() => this.displayDeleteButton(true)} onMouseLeave={() => this.displayDeleteButton(false)} >
                { this.state.showConfirmationWindow ? this.renderDeleteConfirmationWindow() : null }
                { this.state.showDeleteBtn ? this.renderDeleteButton() : null }
                <img className="comment-block__avatar" src={ userName === 'Ian' ? `/Assets/Images/image0.jpg` : userName === 'Nigel' ? `/Assets/Images/image2.jpg` : "/Assets/Images/profile-avatar.jpg" } alt="Profile Avatar" />
                <div className="comment-block__content">
                    <span className="comment-block__content-name">{ userName }</span>
                    <span className="comment-block__content-timestamp">{ func.convertToRelativeTime(timestamp) }</span>
                    <p className="comment-block__content-comment">{ comment }</p>

                    <div className="comment-block__content-reaction">
                        <button className="comment-reactionBtns" type="button">
                            <i className="material-icons like">thumb_up</i><span className="likes">13</span>
                        </button>
                        <button className="comment-reactionBtns" type="button">
                            <i className="material-icons dislike">thumb_down</i><span className="dislikes">14</span>
                        </button>
                        <p>Reply</p>
                    </div>
                </div>
            </li>
        )
    }
}
