//app/components/Recipes.jsx

import React from 'react';
import Recipe from './Recipe.jsx';
import uuid from 'node-uuid';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

//TODO update this to regular component since it should store state now
{/*export default ({recipes, onDelete}) => { */}
export default class Recipes extends React.Component {
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
			recipes: recipes,
			//show: false,
			//nameValid: 'success'
		}
	}

	render() {
		return (
			<div className="recipeList">
				<ul>
					{recipes.map(recipe =>
						<Recipe key={recipe.id} name={recipe.name} onDelete={onDelete.bind(null, recipe.id)} />
					)}
				</ul>
			</div>
		)
	}

	/**
	 * Gets recipe names from localStorage
	 * @return {String} Comma-delimited list of names
	 */
//TODO, need to restructure this for the new data model in localStorage
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
		//console.log('storage count: ' + namesCount);
		return namesStr;
	};
}