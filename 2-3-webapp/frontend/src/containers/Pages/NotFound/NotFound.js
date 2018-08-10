import React, { PureComponent } from 'react';

import './NotFound.css';

import StructuralContainer from '../../../components/Layout/StructuralContainer/StructuralContainer';
import Breadcrumb from '../../../components/Layout/Breadcrumb/Breadcrumb';

export default class NotFound extends PureComponent {

 render() {

  return (
   <React.Fragment>
    <Breadcrumb links={[{ text: 'Pagina não encontrada', to: '#'}]}/>
    <StructuralContainer>
     <p>Pagina não encontrada</p>
    </StructuralContainer>
   </React.Fragment>
  );
 }
}