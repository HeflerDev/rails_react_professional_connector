import React from 'react';
import Navbar from './subComponents/Navbar';
import Header from './subComponents/Header';
import PageContent from './subComponents/PageContent';
import Footer from './subComponents/Footer';

const Home = ()  => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="stack">
        <PageContent />
      </div>
      <Footer />
    </>
  )
}

export default Home;
