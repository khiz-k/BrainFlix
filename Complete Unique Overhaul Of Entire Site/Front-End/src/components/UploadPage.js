import React, { Component } from 'react';

export default class UploadPage extends Component {
    state = {
        file: ''
    }

    renderUploadFile() {
        return  <div className='upload-file'>
                    <button>Choose File</button>
                </div>
    }

    render() {
        const { file } = this.state
        return (
            <div className='upload'>
                { !file ? <UploadInfo/> : this.renderUploadFile() }
            </div>
        )
    }
}

class UploadInfo extends Component {
    render() {
        return (
            <form className='upload-page'>
                <div className='upload-info'>
                    <div className='upload-info__progress'>
                        <div className='upload-info__progress-bar'></div>
                        {/* <div className='progress'></div> */}
                        {/* <p>Processing 80%</p> */}
                        <div className='progress-text'>
                            <p><span>*</span>Click "Publish" to make your video live</p>
                            <div>{  }</div>
                        </div>
                    </div>
                    <div className='upload-info__basicInfo'>
                        <h4>Basic Information</h4>
                        <label className='title'>Title:
                            <input className='title-input' type='text' name='video-title' placeholder='Add a title to your video' />
                        </label>
                        <label className='description'>Description:
                            <textarea maxLength='100' className='description-input' type='text' name='video-description' placeholder='Add a description to your video' />
                        </label>
                        <label className='tags'>Tags:
                            <input className='tags-input' type='text' name='video-tags' placeholder='(e.g., albert einstein, flying pig, mashup, videos)' />
                        </label>
                    </div>
                    <div className='upload-info__videoThumbnails'>
                        <h4>Video Thumbnails</h4>
                        <div className='upload-info__videoThumbnails-images'>
                            <img src='/Assets/Images/image1.jpg' alt='Video Thumbnail'></img>
                            <img src='/Assets/Images/image2.jpg' alt='Video Thumbnail'></img>
                            <img src='/Assets/Images/image3.jpg' alt='Video Thumbnail'></img>
                        </div>
                    </div>
                </div>
                <div className='upload-page__btnBox'>
                    <button type='submit'>Publish</button>
                    <p>Draft Saved</p>
                </div>
            </form>
        )
    }
}