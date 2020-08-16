import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

class Header extends Component {

    state = {
        mobileSearchBar: false
    }

    toggleMobileSearchBar = () => {
        this.setState({mobileSearchBar: !this.state.mobileSearchBar})
    }

    render() {
        const logoPath = '/Assets/Icons/BrainFlix Logo.svg'
        const uploadBtnPath = '/Assets/Icons/Content Upload.svg'
        const profileAvatarPath = '/Assets/Images/profile-avatar.jpg'

        // if this.state.mobileSearchBar is false, close mobile search bar, else, display mobile search bar
        let mobileDisplay = {display: 'none'}
        this.state.mobileSearchBar ? mobileDisplay = {display: 'flex'} : mobileDisplay = {display: 'none'};

        return (
            <nav className="header">
                <Link to='/'>
                    <div className="header-logo">
                        <img className="header-logo__img" src={logoPath} alt="Brainflix Logo"></img>
                        <span className="tooltip header-logo__tooltip">BrainFlix Home</span>
                    </div>
                </Link>

                <div className="mobile-searchBtn" onClick={ this.toggleMobileSearchBar }>
                    <img className="mobile-searchBtn__icon" src="/Assets/Icons/Search.svg" alt="Search Icon"></img>
                    <span className="tooltip mobile-searchBtn__tooltip">Search</span>
                </div>

                <form className="mobile-searchBar" style={ mobileDisplay }>
                    <i className="material-icons searchBtn" onClick={ this.toggleMobileSearchBar }>arrow_back</i>
                    <input className="mobile-searchBar__input" type="text" name="searchInput" placeholder="Search" ></input>
                    <div className="mobile-searchBar__button">
                        <button className="mobile-searchBar__button-icon" type="button">
                        <img src="/Assets/Icons/Search.svg" alt="Search Icon"></img></button>
                        <span className="tooltip mobile-searchBar__button-tooltip">Search</span>
                    </div>
                </form>

                <form className="header-searchBar">
                    <input className="header-searchBar__input" type="text" name="searchInput" placeholder="Search" ></input>
                    <div className="header-searchBar__button">
                        <button className="header-searchBar__button-icon" type="button">
                        <img src="/Assets/Icons/Search.svg" alt="Search Icon"></img></button>
                        <span className="tooltip header-searchBar__button-tooltip">Search</span>
                    </div>
                </form>

                <div className="header-profile">
                    <Link to='/upload'>
                        <div className="header-profile__upload">
                            <img className="header-profile__upload-icon" src={uploadBtnPath} alt="Content Upload Button"></img>
                            <span className="tooltip header-tooltip-text">Upload or post a video</span>
                        </div>
                    </Link>
                    <div className="header-profile__avatar">
                        <img className="header-profile__avatar-img" src={profileAvatarPath} alt="Profile Avatar"></img>
                        <span className="tooltip header-tooltip-text">View My Profile</span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;