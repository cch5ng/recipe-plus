//app/components/Recipes.jsx

import React from 'react';
import Recipe from './Recipe.jsx';
import uuid from 'node-uuid';
import {Link} from 'react-router'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

//TODO update this to regular component since it should store state now
{/*export default ({recipes, onDelete}) => {*/}
export default class Recipes extends React.Component {
	constructor(props) {
		super(props);
		var recipes = this.props.recipes;
		console.log('recipes: ' + recipes);
		var namesAr = this.props.namesAr;
		console.log('namesAr from recipes: ' + namesAr);
	}

	render() {
		let classStr, classStrOutter;
		var namesAr = this.props.namesAr;
//		var name = this.props.name;
//		console.log('name: ' + name);
		//classStr = this.concatName() + ' padding';
		//(this.state.isOpen) ? classStr = this.concatName() + ' padding' : classStr = this.concatName() + ' padding hidden';
		classStrOutter = 'recipe clear';

		return (
			<div className="recipeList">
				<ul>
					{namesAr.map(name =>
						<Link to='/recipe/:key'>
							<div className='padding' key={this.genKey()}>
								<p className="h4" onClick={this.toggleIngredients}>{name}</p>
							</div>
							
						</Link>
					)}
				</ul>
			</div>
		)
	}

	/**
	 * Concatenate multi-word names (removing spaces), otherwise the class name used to select
	 * a long name would break the accordion display functionality due to spaces
	 * @return {[type]} [description]
	 */
	concatName = () => {
		let name = this.props.name;
		let nameAr = name.split(' ');
		let nameStr = nameAr.join('');
		return nameStr;
	};

	genKey = () => {
		return uuid.v4();
	}

}

//{*/<Recipe key={recipe.id} name={recipe.name} onDelete={onDelete.bind(null, recipe.id)} />*/}