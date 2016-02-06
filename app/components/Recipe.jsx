//app/components/Recipe.jsx

import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

export default class Recipe extends React.Component {
//var Recipe = React.createClass({

	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			name: this.props.data,
			ingredients: this.getIngredients()
		}
	}

	// getInitialState: function() {
	// 	return {isOpen: false, name: this.props.data, ingredients: this.getIngredients()}
	// },

	// componentDidMount: function() {
	// 	this.render();
	// },

	render() {
		let classStr, classStrOutter;
		(this.state.isOpen) ? classStr = this.concatName() + ' padding' : classStr = this.concatName() + ' padding hidden';
		//let classStrOutter = 'recipe clear';
//TO FIX - temp fix for removing deleted recipe from view but it is a hack (only hiding it with css and not
//truly updating the parent state, names in RecipeList)
		(this.state.name) ? classStrOutter = 'recipe clear' : classStrOutter = 'recipe clear hidden';
		let ingredientsAr = [];
		let ingredientsStr;
		let nameStr = this.state.name;
		//console.log('this.props.data: ' + this.props.data);
		ingredientsStr = localStorage.getItem(this.state.name);
		//console.log('ingredientsStr: ' + ingredientsStr);
		if (ingredientsStr) {
//on data input to localStorage, spaces are trimmed so list should be strictly comma-delimited
			ingredientsAr = ingredientsStr.split(',');
		}
		// console.log('length ingredientsAr: ' + ingredientsAr.length);
		var ingredientNodes = ingredientsAr.map(function(ingred, i) {
			let keyStr = trimSpaces(nameStr) + ingred;
			return (
				<div className="ingredient" key={i} >
					{ingred}
				</div>
			);
		});

		return (
			<div className={classStrOutter} >
				<p className="h4" onClick={this.toggleIngredients}>{this.state.name}</p>
				<div className={classStr}>
					<p className="h5">INGREDIENTS</p>

					<div className="ingredientList">
						{ingredientNodes}
					</div>

					<div className="button-section">
						<Button bsStyle="danger" data={this.state.name} onClick={this.deleteRecipe} >Delete</Button>
						<Button bsStyle="default" onClick={() => this.setState({ show: true})}>Edit</Button>

						<div className="modal-container">
							<Modal
								show={this.state.show}
								onHide={close}
								container={this}
								aria-labelledby="contained-modal-title">

								<Modal.Header>
									<Modal.Title>Edit Recipe</Modal.Title>
								</Modal.Header>

								<Modal.Body>
									<form id="recipeEditForm">
										<div className="form-group">
											<label htmlFor="recipeName">Name</label>
											<input type="text" className="form-control" id="recipeName" name="recipeName" size="50" value={this.props.data} readOnly />
										</div>
										<div className="form-group">
											<label htmlFor="recipeIngredientsEdit">Ingredients</label>
											<input type="text" className="form-control" id="recipeIngredientsEdit" name="recipeIngredientsEdit" value={this.state.ingredients} onChange={this.updateIngredientsField} size="50" />
										</div>
									</form>
								</Modal.Body>

								<Modal.Footer>
									<Button type="submit" onClick={this.editRecipe} bsStyle="primary">Edit Recipe</Button>
									<Button bsStyle="default" onClick={() => this.setState({show: false})}>Close</Button>
								</Modal.Footer>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getIngredients = () => {
		let ingredientsStr = localStorage.getItem(this.props.data);
		//console.log('ingredientsStr: ' + ingredientsStr);
		return ingredientsStr;
	};

	updateIngredientsField = (event) => {
		this.setState({ingredients: event.target.value});
		//console.log('this.state.ingredients: ' + this.state.ingredients);
	};

	//concatenate names (removing spaces), otherwise the class name used to select a particular
	//recipe name would break due to spaces
	concatName = () => {
		let nameAr = this.props.data.split(' ');
		let nameStr = nameAr.join('');
		return nameStr;
	};

	toggleIngredients = () => {
		if (this.state.isOpen) {
			this.setState({isOpen: false});
		} else {
			this.setState({isOpen: true});
		}
	};

	deleteRecipe = () => {
		console.log('deleting recipe: ' + this.state.name);
		localStorage.removeItem(this.state.name);
		this.setState({name: null});
		//this is a hack to get delete to work properly, should actually update the RecipeList state, names
		//not sure how to get into it w/o flux?
		document.location.reload(true);

//TODO this event should also result in updating the RecipeList view
	};

	editRecipe = (event) => {
		event.preventDefault();

	//parsing the ingredients, cleaning up the format so it will display cleanly later on
		var name = this.props.data
		//console.log('name: ' + name);
		var ingredientsStr = this.state.ingredients;
		var ingredientsAr = ingredientsStr.split(',');
		var ingredientsTrim = [];
		ingredientsAr.forEach(function(item) {
			var itemCopy = item.slice(0).trim();
			ingredientsTrim.push(itemCopy);
		});
		var ingredientsStrClean = ingredientsTrim.join(',');
		//console.log('ingredientsStrClean: ' + ingredientsStrClean);

	//updating localStorage
		localStorage.setItem(name, ingredientsStrClean);
		this.setState({ingredients: ingredientsStrClean});

		let form = document.getElementById('recipeEditForm');
		form.reset();
	};


//});

}

//helper remove spaces between chars/words; used to create ingredient unique keys where the recipe has mult words
function trimSpaces(str) {
	let ar = [], resultStr;
	ar = str.split(' ');
	resultStr = ar.join('');

	return resultStr;
}