//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import '../startup.js';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="container-fluid" >
				<div className="row">
					<nav className="navbar navbar-default">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Recipe Box</a>
						</div>
					</nav>
				</div>

				<div className="recipeSection">
					<RecipeList />
					<MModalAdd />
				</div>

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
}

//used by MModals
const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};

var RecipeList = React.createClass({
	setNamesState: function(namesAr) {
		this.setState({names: namesAr});
	},

	getNames: function() {
		let namesStr = '';
		let namesCount;
		namesCount = localStorage.length;
		console.log('namesCount: ' + namesCount);
		for (let i = 0; i < namesCount; i++) {
			//(namesCount - 1) prevents extra empty list item at the bottom
			if (i < namesCount - 1) {
				namesStr += localStorage.key(i) + ',';
			} else {
				namesStr += localStorage.key(i);
			}
		}
		console.log('namesStr: ' + namesStr);
		this.setState({names: namesStr});
	},

	getInitialState: function() {
		return {names : []};
	},

	componentDidMount: function() {
		this.getNames();
		this.render();
	},

	render: function() {
		let namesAr = [];
		//console.log('this.state.names: ' + this.state.names);
		namesAr = this.state.names.split(',');
		//console.log('namesAr: ' + namesAr);

		var recipeNodes = namesAr.map(function(recipe) {
			return (
				<Recipe key={recipe} data={recipe}>
					{recipe}
				</Recipe>
			);
		});

		return (
			<div className="recipeList">
				<ul>
				{recipeNodes}
				</ul>
			</div>
		);
	}
});

var Recipe = React.createClass({
	//concatenate names (removing spaces), otherwise the class name used to select a particular
	//recipe name would break due to spaces
	getInitialState: function() {
		return {isOpen: false}
	},

	concatName: function() {
		let nameAr = this.props.data.split(' ');
		let nameStr = nameAr.join('');
		return nameStr;
	},

	toggleIngredients: function() {
		if (this.state.isOpen) {
			this.setState({isOpen: false});
		} else {
			this.setState({isOpen: true});
		}
	},

	render: function() {
		let classStr;
		(this.state.isOpen) ? classStr = this.concatName() + ' padding' : classStr = this.concatName() + ' padding hidden';
		return (
			<div className="recipe clear">
				<p className="h4" onClick={this.toggleIngredients}>{this.props.data}</p>
				<div className={classStr}>
					<p className="h5">INGREDIENTS</p>
					<IngredientsList data={this.props.data}/>
					<Buttons data={this.props.data} />
				</div>
			</div>
		);
	}
});

var IngredientsList = React.createClass({
	render: function() {
		let ingredientsAr = [];
		let ingredientsStr;
		let nameStr = this.props.data;
		//console.log('this.props.data: ' + this.props.data);
		ingredientsStr = localStorage.getItem(this.props.data);
		//console.log('ingredientsStr: ' + ingredientsStr);
		if (ingredientsStr) {
//on data input to localStorage, spaces are trimmed so list should be strictly comma-delimited
			ingredientsAr = ingredientsStr.split(',');
		}
		// console.log('length ingredientsAr: ' + ingredientsAr.length);
		var ingredientNodes = ingredientsAr.map(function(ingred) {
			let keyStr = trimSpaces(nameStr) + ingred;
			return (
				<div className="ingredient" key={keyStr} >
					{ingred}
				</div>
			);
		});

		return (
			<div className="ingredientList">
				{ingredientNodes}
			</div>
		);
	}
});

var Buttons = React.createClass({
	deleteRecipe: function() {
		console.log('deleting recipe: ' + this.props.data);
		localStorage.removeItem(this.props.data);
//TODO this event should also result in updating the RecipeList view
	},

	render: function() {
		return (
			<div className="button-section">
				<li className="buttons"><button className="btn btn-danger" data={this.props.data} onClick={this.deleteRecipe} >Delete</button></li>
				<li className="buttons"><MModalEdit data={this.props.data}></MModalEdit></li>
			</div>
			);
	}
});

var MModalAdd = React.createClass({

	getInitialState: function() {
		return { modalIsOpen: false, names: []};
	},

	componentDidMount: function() {
		let namesAr = [];
		this.setState({names: namesAr});
		// console.log('names: ' + this.state.names);
	},

	openModal: function() {
		this.setState({modalIsOpen: true});
	},

	closeModal: function(event) {
		event.preventDefault();
		this.setState({modalIsOpen: false});
//TODO hardcoded a browser refresh to get the latest list of recipes but I don't think this is the best way
		document.location.reload(true);
//TODO how to get the recipe list to update when the modal is closed
	},

	saveRecipe: function(event) {
		event.preventDefault();

//parsing the ingredients, cleaning up the format so it will display cleanly later on
		// console.log('clicked save');
		var name = document.getElementById('recipeName').value;
		// console.log('name: ' + name);
		var ingredientsStr = document.getElementById('recipeIngredients').value;
		// console.log('ingredientsStr: ' + ingredientsStr);
		var ingredientsAr = ingredientsStr.split(',');
	//stores final array of ingredients strings, trimmed
		var ingredientsTrim = [];
		// console.log('ingredientsAr: ' + ingredientsAr);
		// console.log('length ingredientsAr: ' + ingredientsAr.length);
		ingredientsAr.forEach(function(item) {
			// console.log('item: ' + item);
			var itemCopy = item.slice(0).trim();
			ingredientsTrim.push(itemCopy);
		});
		//making the ingredients list in localStorage comma delimited but no space
		var ingredientsStrClean = ingredientsTrim.join(',');
		console.log('ingredientsStrClean: ' + ingredientsStrClean);

//updating localStorage
		localStorage.setItem(name, ingredientsStrClean);

//TODO here should also reset the session data var so all latest recipes display
		let namesAr = [];
		namesAr.push(name);
		this.setState({names: ingredientsTrim});

		let form = document.getElementById('recipeForm');
		form.reset();
	},

	render: function() {
		return (

				<div className="clear">
					<button className="btn btn-default btn-add" onClick={this.openModal} >Add Recipe</button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						style={customStyles} >
						<p className="h4">Add a recipe <i className="fa fa-times" onClick={this.closeModal}></i></p>

						<form id="recipeForm">
							<div className="form-group">
								<label htmlFor="recipe-name">Name</label>
								<input type="text" className="form-control" id="recipeName" name="recipeName" size="50" />
							</div>
							<div className="form-group">
								<label htmlFor="recipe-ingredients">Ingredients</label>
								<input type="text" className="form-control" id="recipeIngredients" name="recipeIngredients" placeholder="enter ingredients separated by commas" size="50" />
							</div>
							<button type="submit" onClick={this.saveRecipe} className="btn btn-primary">Add Recipe</button> <button className="btn btn-default" onClick={this.closeModal}>Close</button>
						</form>
					</Modal>
				</div>
		);
	}
});

var MModalEdit = React.createClass({

	getInitialState: function() {
		return { modalIsOpen: false, names: [], ingredients: this.getIngredients()};
	},

	openModal: function() {
		this.setState({modalIsOpen: true});
	},

	closeModal: function(event) {
		event.preventDefault();
		this.setState({modalIsOpen: false});
//TODO hardcoded a browser refresh to get the latest list of recipes but I don't think this is the best way
//TODO how to get the recipe list to update when the modal is closed
	},

	getIngredients: function() {
		let ingredientsStr = localStorage.getItem(this.props.data);
		//console.log('ingredientsStr: ' + ingredientsStr);
		return ingredientsStr;
	},

	updateIngredientsField: function(event) {
		this.setState({ingredients: event.target.value});
		//console.log('this.state.ingredients: ' + this.state.ingredients);
	},

	editRecipe: function(event) {
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

		let form = document.getElementById('recipeEditForm');
		form.reset();
	},

	render: function() {
		return (

				<div>
					<button className="btn btn-default" onClick={this.openModal}>Edit</button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						style={customStyles} >
						<p className="h4">Edit recipe <i className="fa fa-times" onClick={this.closeModal}></i></p>

						<form id="recipeEditForm">
							<div className="form-group">
								<label htmlFor="recipeName">Name</label>
								<input type="text" className="form-control" id="recipeName" name="recipeName" size="50" value={this.props.data} readOnly />
							</div>
							<div className="form-group">
								<label htmlFor="recipeIngredientsEdit">Ingredients</label>
								<input type="text" className="form-control" id="recipeIngredientsEdit" name="recipeIngredientsEdit" value={this.state.ingredients} onChange={this.updateIngredientsField} size="50" />
							</div>
							<button type="submit" onClick={this.editRecipe} className="btn btn-primary">Edit Recipe</button> <button className="btn btn-default" onClick={this.closeModal}>Close</button>
						</form>
					</Modal>
				</div>
		);
	}
});

//helper remove spaces between chars/words; used to create ingredient unique keys where the recipe has mult words
function trimSpaces(str) {
	let ar = [], resultStr;
	ar = str.split(' ');
	resultStr = ar.join('');

	return resultStr;
}