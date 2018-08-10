import React, { Component } from 'react';

// componentes
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Router from '../Router/Router';

import './Layout.css';

class Layout extends Component {
 render() {

  return (
   <React.Fragment>
    <Header />
    <main className="Layout">
     <Router {...this.props} />
    </main>
    <Footer />
   </React.Fragment>
  );
 }
}

export default Layout;
