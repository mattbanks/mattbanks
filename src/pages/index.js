import React from 'react';
import Gallery from '@browniebroke/gatsby-image-gallery';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Scroll from '../components/Scroll';

import mattHeadshot from '../assets/images/matt-headshot-2022.jpg';
import shareImg from '../assets/img/share.jpg';
import config from '../../config';

export const Head = () => (
  <>
    <title>{config.siteTitle}</title>
    <meta name="description" content={config.description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@mattbanks" />
    <meta name="twitter:creator" content="@mattbanks" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={config.siteTitle} />
    <meta property="og:url" content="https://www.mattbanks.me" />
    <meta property="og:description" content={config.siteTitle} />
    <meta property="og:site_name" content={config.heading} />
    <meta property="og:image" content={`https://www.mattbanks.me${shareImg}`} />
  </>
);

const IndexPage = ({ data }) => {
  const images = data.images.edges.map(({ node }) => node.childImageSharp);
  const lightboxOptions = {};

  return (
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
            <p>{config.description}</p>
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
            <p>
              You can usually find me with a coffee or a camera in a my hand.
            </p>
            <p>
              I work at{' '}
              <OutboundLink
                href="https://wolfjawstudios.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wolfjaw Studios
              </OutboundLink>{' '}
              leading teams to create game services and web applications for
              some of the biggest and most successful video game companies in
              the world. I previously worked in a similar role at PUBG and
              MadGlory.
            </p>
            <p>
              I'm also the founder of{' '}
              <OutboundLink
                href="https://www.kernelcreativemedia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kernel Creative Media
              </OutboundLink>
              , which I run with my wife, Vanessa. We offer marketing,
              photography, web design and development. If you have any projects
              in mind, head over that way and get in touch with us!
            </p>
          </div>
        </section>
      </section>

      <section id="three" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>Photos</h2>
            <p>
              A sampling of some recent work. If you like what you see,{' '}
              <OutboundLink
                href="https://www.kernelcreativemedia.com/#contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                please get in touch
              </OutboundLink>
              !
            </p>
          </header>
        </div>

        <div className="inner gallery">
          <Gallery images={images} rowMargin="0" colWidth="100" />
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { name: ASC }
    ) {
      edges {
        node {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 450
              height: 400
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;

export default IndexPage;
