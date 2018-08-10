import React, { PureComponent } from 'react';

import './Logo.css';
import logo from '../../../assets/logo.svg';

export default class Logo extends PureComponent {
 render() {
  return (
   <object className="Logo" type="image/svg+xml" data={logo}>
    -
   </object>    
  );
 }
}