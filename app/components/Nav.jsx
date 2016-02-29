//app/components/Nav.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export default() => {
	return (
		<div className="row">
			<nav className="navbar navbar-default">
				<div className="navbar-header">
					<a className="navbar-brand" href="#">Recipe Plus</a>
				</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li><Link to='/'>All Recipes</Link></li>
							<li className=""><Link to='/add'>Add Recipe</Link></li>
						</ul>
				</div>
			</nav>
		</div>
	)
}