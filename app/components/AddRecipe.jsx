//app/components/AddRecipe.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import '../startup.js';
import Recipes from './Recipes.jsx';
import uuid from 'node-uuid';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {Link} from 'react-router';

export default class AddRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			nameValid: 'success'
		}
	}

	render () {
		return (
				<div className="container-fluid">
					{/*<Modal
						show={this.state.show}
						onHide={close}
						container={this}
						aria-labelledby="contained-modal-title">

						<Modal.Header>
							<Modal.Title>Add Recipe</Modal.Title>
						</Modal.Header>

						<Modal.Body>*/}
							<form id="recipeForm">
								<Input type="text" label="Name" groupClassName="group-class" labelClassName="label-class"
									id="recipeName" name="recipeName" size="50" help="Name must be unique or recipe will not be saved."
									bsStyle={this.state.nameValid} hasFeedback onChange={this.validationState}
								/>
								<Input type="text" className="form-control" id="recipeIngredients" name="recipeIngredients" label="Ingredients" placeholder="enter ingredients separated by commas" size="50" />
								<Input type="textarea" className="form-control" id="recipeSteps" name="recipeSteps" label="Steps" placeholder="separate steps by empty paragraph" size="200" />


							</form>
						{/*</Modal.Body>

						<Modal.Footer>*/}
							<Button type="submit" onClick={this.addRecipe} bsStyle="primary" >Save</Button>
							<Link to='/'><Button bsStyle="default" onClick={() => this.setState({show: false})}>Close</Button></Link>
						{/*</Modal.Footer>
					</Modal>*/}
				</div>

			)
	}

	/**
	 * Form validation to ensure that a new name field is unique (key in localStorage)
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	validationState = (event) => {
		let matchCount;
		let curName = event.target.value;
		if (localStorage.getItem(curName)) {
			this.setState({nameValid: 'error'});
		} else {
			this.setState({nameValid: 'success'});
		}
	};

	/**
	 * Adds recipe to local storage and to state
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	addRecipe = (event) => {
		if (this.state.nameValid === 'success') {
			event.preventDefault();

			//recipeObj = {ingredients: [str1, str2, ...], steps: [str1, str2, ...]}
			let mrecipeObj = {}

	//parsing the ingredients, cleaning up the format so it will display cleanly later on
			let name = document.getElementById('recipeName').value;
			console.log('name: ' + name);
			var ingredientsStr = document.getElementById('recipeIngredients').value;
			var ingredientsAr = ingredientsStr.split(',');
		//stores final array of ingredients strings, trimmed
			var ingredientsTrim = [];
			ingredientsAr.forEach(function(item) {
				var itemCopy = item.slice(0).trim();
				ingredientsTrim.push(itemCopy);
			});
			//making the ingredients list in localStorage comma delimited but no space
			//var ingredientsStrClean = ingredientsTrim.join(',');
			mrecipeObj.ingredients = ingredientsTrim;

	//checking the steps, what signifies the para breaks
			let steps = document.getElementById('recipeSteps').value;
			let stepsAr = steps.split('\n');
			console.log('steps: ' + steps);
			console.log('stepsAr: ' + stepsAr);

			mrecipeObj.steps = stepsAr;

	//updating localStorage
			//localStorage.setItem(name, ingredientsStrClean);
			localStorage.setItem(name, JSON.stringify(mrecipeObj));

			let form = document.getElementById('recipeForm');
			form.reset();

//TODO update application state w/ new model def

			// let curRecipes = this.state.recipes;
			// let recipeObj = {};
			// recipeObj.id = uuid.v4();
			// recipeObj.name = name;
			// curRecipes.push(recipeObj);
			// this.setState({recipes: curRecipes});
			// //console.log('typeof recipes from addRecipes: ' + typeof this.state.recipes);
			//console.log('recipes length: ' + this.state.recipes.length);
		}
	};

}