import React from 'react';
import Pic from '../../../assets/images/presentation_pic.png';

const PageContent = () => (
  <div>
  <hr />
  <h1>How does it work?</h1>
  <div className="board even">
  <div className="col-12 col-l-4 queue column center">
    <img src={Pic} alt="" className="content-pic" />
  </div>
  <div className="col-12 col-l-5 queue column">
  <h2>We connect you with a professional (of any area) in an hour session.</h2>
  <p>
    Be it to learn something new, or to chat with an engineer about about... engines maybe?
    {' '}
    Here you can schedule a session and connect with a professional in any area, from a nurse to a guitarrist,
    exchanging ideas about anything.
  </p>
  </div>
  </div>
  </div>
);

export default PageContent;
