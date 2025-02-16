/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css"; // Ensure styles are imported

const Footer = () => {
  return (
    <footer id="footer" className="site-footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-left">
            Lewis University <a href="https://www.lewisu.edu/" target="_blank" rel="noopener noreferrer">Homepage</a>
          </div>
          <div className="footer-right">
            Github <a href="https://github.com/IrvingFSanchez" target="_blank" rel="noopener noreferrer">Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
