import React from 'react';
import './hero.scss';

export default function Hero (props) {
  // const heroID = props.match.params.id;
  return (
    <>
      <section className="hero">
        <video key={props.match && props.match.params.id} className="hero-video" poster={props.image} controls>
          <source src={props.source} type="video/mp4" className="video-source"/>
        </video>
      </section>
      
    </>
  );
}