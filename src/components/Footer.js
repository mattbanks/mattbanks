import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import config from '../../config';

export default function Footer() {
  return (
    <footer id="footer">
      <ul className="icons">
        {config.socialLinks.map((social) => {
          const { style, icon, name, url } = social;
          return (
            <li key={url}>
              <OutboundLink
                href={url}
                className={`icon ${style} ${icon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="label">{name}</span>
              </OutboundLink>
            </li>
          );
        })}
      </ul>
      <ul className="copyright">
        <li>&copy; Matt Banks</li>
        <li>All Rights Reserved</li>
        <li>
          Design:{' '}
          <OutboundLink
            href="http://html5up.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spectral - HTML5 UP
          </OutboundLink>
        </li>
      </ul>
    </footer>
  );
}
