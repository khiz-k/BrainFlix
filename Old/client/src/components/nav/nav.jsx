import React from 'react';
import './nav.scss';
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <header>
      <section className="nav-bar">
        <div className="nav-bar__logo">
          <Link to="/" className="nav-bar__anchor">
            <img src={props.logo} alt="BrainFlix Logo" className="nav-bar__logo-image" />
          </Link>
        </div>
        <nav className="nav-bar__main">
        <ul className="nav-bar__list">
          <li className="nav-bar__list-item">
            <form className="nav-bar__form">
              <input type="text" name="search" placeholder="Search" className="nav-bar__search" />
            </form>
          </li>
          <li className="nav-bar__list-item user-upload">
          <Link to="/upload" className="upload-button__link"><button name="uploadVideo" className="upload-button" id="upload-button" value="upload">Upload</button></Link>
            <img src={props.image} alt="User" className="user-image" />
          </li>
        </ul>
        </nav>
      </section>
    </header>
  );
}
