import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import '../assets/sass/main.scss';
import Footer from './Footer';

import config from '../../config';

import shareImg from '../assets/img/share.jpg';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloaded: true,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ isPreloaded: false });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { children } = this.props;
    const { isPreloaded } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data) => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content: config.description,
                },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: '@mattbanks' },
                { name: 'twitter:creator', content: '@mattbanks' },
                { property: 'og:type', content: 'website' },
                {
                  property: 'og:title',
                  content: data.site.siteMetadata.title,
                },
                {
                  property: 'og:url',
                  content: 'https://www.mattbanks.me',
                },
                {
                  property: 'og:description',
                  content: data.site.siteMetadata.title,
                },
                { property: 'og:site_name', content: config.heading },
                {
                  property: 'og:image',
                  content: `https://www.mattbanks.me${shareImg}`,
                },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <div
              className={
                isPreloaded
                  ? 'landing main-body is-preload'
                  : 'landing main-body'
              }
            >
              <div id="page-wrapper">
                {/* <SideBar fullMenu={fullMenu} /> */}
                {children}
                <Footer />
              </div>

              <a
                rel="me"
                href="https://mastodon.social/@mattbanks"
                style={{ display: 'none' }}
              >
                Mastodon
              </a>
            </div>
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
