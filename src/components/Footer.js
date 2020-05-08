import React from 'react';
import config from '../../config';
export default function Footer() {
  return (
    <footer id="footer">
      <ul className="icons">
        {config.socialLinks.map((social) => {
          const { style, icon, name, url } = social;
          return (
            <li key={url}>
              <a
                href={url}
                className={`icon ${style} ${icon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="label">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="copyright">
        <li>&copy; Matt Banks</li>
        <li>All Rights Reserved</li>
        <li>
          Design:{' '}
          <a
            href="http://html5up.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spectral - HTML5 UP
          </a>
        </li>
      </ul>
    </footer>
  );
}
