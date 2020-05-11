import React from 'react';
import { Gallery } from 'gatsby-theme-gallery';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

import mattHeadshot from '../assets/images/matt.jpg';
import config from '../../config';

const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <h2>{config.heading}</h2>
        <p>{config.subHeading}</p>
      </div>
      <Scroll type="id" element="one">
        <a href="#one" className="more">
          Learn More
        </a>
      </Scroll>
    </section>

    <section id="one" className="wrapper style1 special">
      <div className="inner">
        <header className="major">
          <h2>About Matt</h2>
          <p>
            Photographer, Software Engineer, Taco Consumer, Music Lover, Pour
            Over Coffee and Craft Beer Snob.
          </p>
        </header>
        <ul className="icons major">
          <li>
            <span className="icon solid fa-camera major style1">
              <span className="label">Photographer</span>
            </span>
          </li>
          <li>
            <span className="icon solid fa-code major style2">
              <span className="label">Engineer</span>
            </span>
          </li>
          <li>
            <span className="icon solid fa-coffee major style3">
              <span className="label">Coffee Drinker</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section id="two" className="wrapper alt style2">
      <section className="spotlight">
        <div className="image">
          <img src={mattHeadshot} alt="" />
        </div>
        <div className="content">
          <h2>What I Do</h2>
          <p>You can usually find me with a coffee or a camera in a my hand.</p>
          <p>
            I run{' '}
            <OutboundLink
              href="https://www.kernelcreativemedia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kernel Creative Media
            </OutboundLink>{' '}
            with my wife, Vanessa. We offer marketing, photography, web design
            and development. If you have any cool projects in mind, head over
            that way and get in touch with us!
          </p>
          <p>
            I also work at{' '}
            <OutboundLink
              href="https://wolfjawstudios.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wolfjaw Studios
            </OutboundLink>{' '}
            creating web applications and platforms for some of the best video
            game companies in the world. I previously worked at PUBG and
            MadGlory.
          </p>
        </div>
      </section>
    </section>

    <section id="three" className="wrapper style3 special">
      <div className="inner">
        <header className="major">
          <h2>Photos</h2>
          <p>Some recent pictures that I like. I hope you like them too!</p>
        </header>
      </div>

      <div className="inner gallery">
        <Gallery />
      </div>
    </section>
  </Layout>
);

export default IndexPage;
