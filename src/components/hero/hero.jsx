import React, { Component } from 'react';
import './hero.scss';

export default function Hero (props) {
  return (
    <>
      <section className="hero">
        <video key={props.id} className="hero-video" poster={props.image} controls>
          <source src={props.source} type="video/mp4" className="video-source"/>
        </video>
      </section>
    </>
  );
}