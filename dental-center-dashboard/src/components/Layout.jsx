import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/Layout'; 

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-body">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
      
    </div>
  );
};

export default Layout;
