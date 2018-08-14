import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

import StructuralContainer from '../StructuralContainer/StructuralContainer';
import Logo from '../Logo/Logo';
import './Header.css';

class Header extends PureComponent {
	render() {
		return (
			<header className="Header">
				<StructuralContainer>
					<Link to="/">
						<Logo />
						Contacts Test
					</Link>
				</StructuralContainer>
			</header>
		);
	}
}

export default Header;
