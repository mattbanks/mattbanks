/* eslint-disable react/destructuring-assignment */
import smoothscroll from 'smoothscroll-polyfill';
import React from 'react';
import PropTypes from 'prop-types';

const Element = (props) => props.children;

class Scroll extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    smoothscroll.polyfill();
  }

  handleClick(e) {
    e.preventDefault();
    let elem = 0;
    let scroll = true;
    const { type, element, offset, timeout } = this.props;
    if (type && element) {
      switch (type) {
        case 'class':
          // eslint-disable-next-line prefer-destructuring
          elem = document.getElementsByClassName(element)[0];
          scroll = !!elem;
          break;
        case 'id':
          elem = document.getElementById(element);
          scroll = !!elem;
          break;
        default:
      }
    }
    // eslint-disable-next-line no-unused-expressions
    scroll
      ? this.scrollTo(elem, offset, timeout)
      : console.log(`Element not found: ${element}`);
  }

  // eslint-disable-next-line class-methods-use-this
  scrollTo(element, offSet = 0, timeout = null) {
    const elemPos = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : 0;
    if (timeout) {
      setTimeout(() => {
        window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
      }, timeout);
    } else {
      window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
    }
  }

  render() {
    return (
      <Element>
        {typeof this.props.children === 'object' ? (
          React.cloneElement(this.props.children, { onClick: this.handleClick })
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <span onClick={this.handleClick}>{this.props.children}</span>
        )}
      </Element>
    );
  }
}

Scroll.propTypes = {
  type: PropTypes.string,
  element: PropTypes.string,
  offset: PropTypes.number,
  timeout: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Scroll;
