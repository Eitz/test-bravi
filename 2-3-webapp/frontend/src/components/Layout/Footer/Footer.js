import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

import StructuralContainer from '../StructuralContainer/StructuralContainer';
import './Footer.css';

export default class Header extends PureComponent {
 render() {
  return (
   <footer className="Footer">
    <StructuralContainer>
     <ol>
      <li>
       <Link to="/">
        Contacts Test
       </Link>
      </li>
     </ol>
    </StructuralContainer>
   </footer>
  );
 }
}