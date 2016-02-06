//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import '../startup.js';
import Recipes from './Recipes.jsx';
import uuid from 'node-uuid';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		let namesAr = [];
		var recipes = [];
		namesAr = this.getNames().split(',');
		namesAr.forEach(name => {
			let mrecipe = {};
			mrecipe.name = name;
			mrecipe.id = uuid.v4();
			recipes.push(mrecipe);
		});
		this.state = {
			recipes : recipes //,
			//nameValid: 'success'
		}
	}

	render() {
		const recipes = this.state.recipes;
		//const nameValid = this.state.nameValid;
		return (
			<div className="container-fluid" >
				<div className="row">
					<nav className="navbar navbar-default">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Recipe Box</a>
						</div>
					</nav>
				</div>

				<Recipes recipes={recipes} onEdit={this.editRecipe} onDelete={this.deleteRecipe} />
{/* nameValid={nameValid} */}

				<div className="row footer">
					<div className="col-xs-12 col-sm-12">
						<p className="text-center">Brought to you with <i className="fa fa-heart"></i><br /> 
							from <a href="http://www.carolchung.com" target="_blank">Tusk Tusk Dev.</a><br />
							<a href="https://github.com/cch5ng/recipe-box" target="_blank">Source</a>
						</p>
					</div>
				</div>
			</div>
		);
	}

	editRecipe = () => {
		console.log('todo: editRecipe');
	};

	deleteRecipe = () => {
		console.log('todo: deleteRecipe');
	};

	getNames = () => {
		let namesStr = '';
		let namesCount;
		namesCount = localStorage.length;
		//console.log('namesCount: ' + namesCount);
		for (let i = 0; i < namesCount; i++) {
			//(namesCount - 1) prevents extra empty list item at the bottom
			if (i < namesCount - 1) {
				namesStr += localStorage.key(i) + ',';
			} else {
				namesStr += localStorage.key(i);
			}
		}
		//console.log('namesStr: ' + namesStr);
		console.log('storage count: ' + namesCount);
		return namesStr;
	};



}