import React from 'react';
import Header from './subComponents/Header';
import PageContent from './subComponents/PageContent';

const Home = ()  => {
  return (
    <>
      <Header />
      <div className="stack">
        <PageContent />
      </div>
    </>
  )
}

export default Home;
