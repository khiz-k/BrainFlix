import React from 'react';
import './hero.scss';

export default function Hero (props) {
  return (
    <>
      <section className="hero">
        <video key={props.match && props.match.params.id} className="hero-video" poster={props.mainVid.image} controls>
          <source src={props.mainVid.source} type="video/mp4" className="video-source"/>
        </video>
      </section>
    </>
  );
}
