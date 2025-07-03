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
              I'm the VP of Engineering at{' '}
              <OutboundLink
                href="https://humach.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Humach
              </OutboundLink>, where I’m building and leading a new AI
              Engineering team. We're focused on shipping real products,
              moving fast, and figuring out the right systems and
              structure as we grow.
            </p>
            <p>
              Before this, I spent time as a fractional CTO helping a
              couple of fintech startups get their products off the
              ground and scale their engineering teams. And before that,
              I spent over a decade in the gaming industry, leading
              teams and building tech behind some pretty amazing games
              like Destiny 2, PUBG, League of Legends, Among Us,
              NBA 2K, and others.
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
