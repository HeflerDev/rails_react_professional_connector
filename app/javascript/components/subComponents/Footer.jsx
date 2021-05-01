import React from 'react';

const Footer = () => (
  <footer className="board center">
    <ul className="col-12 col-m-4 col-l-3">
      <li><strong>Company</strong></li>
      <ul>
        <li>About Us</li>
        <li>Our Vision</li>
        <li>Products</li>
        <li>Business</li>
      </ul>
    </ul>
    <ul className="col-12 col-m-4 col-l-3">
      <li><strong>Resources</strong></li>
      <ul>
        <li>Blog</li>
        <li>Ebooks</li>
        <li>User Manual</li>
      </ul>
    </ul>
    <ul className="col-12 col-m-4 col-l-3">
      <li><strong>Get Help</strong></li>
      <ul>
        <li>Contact Us</li>
        <li>Online Support</li>
        <li>The Program</li>
        <li>Report a Problem</li>
      </ul>
    </ul>
    <div className="queue center">
      <p>Copyright 2021 HeflerDev | Refer when use</p>
    </div>
  </footer>
);

export default Footer;
