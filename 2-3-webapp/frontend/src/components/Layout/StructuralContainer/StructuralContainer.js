import React, { PureComponent } from 'react';

import './StructuralContainer.css';

class StructuralContainer extends PureComponent {
	render() {
		return (
			<div className="StructuralContainer">
				{this.props.children}
			</div>
		);
	}
}

export default StructuralContainer;
