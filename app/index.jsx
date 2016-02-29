//app/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import AddRecipe from './components/AddRecipe.jsx';
import Recipes from './components/Recipes.jsx';
import {Router, Route, hashHistory} from 'react-router';
//import './fixed-data-table.css';

require("!style!css!sass!./main.scss");
//require("!css!./fixed-data-table.css");

var css = require("!css!sass!./main.scss");

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path='/' component={App}>
			<Route path='/all' component={Recipes} />
			<Route path='/add' component={AddRecipe} />
		</Route>
	</Router>
	), document.getElementById('app'));