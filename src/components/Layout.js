import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../assets/sass/main.scss';
import Footer from './Footer';

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
      <div
        className={
          isPreloaded ? 'landing main-body is-preload' : 'landing main-body'
        }
      >
        <div id="page-wrapper">
          {children}
          <Footer />
        </div>

        <a
          href="https://mastodon.social/@mattbanks"
          style={{ display: 'none' }}
        >
          Mastodon
        </a>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
