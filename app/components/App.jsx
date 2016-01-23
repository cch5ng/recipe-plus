//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import './Modal.jsx';
//import {Table, Column, Cell} from 'fixed-data-table';
import './startup.js';
var FixedDataTable = require('fixed-data-table');
const {Table, Column, Cell} = FixedDataTable;

var urlRecent = "http://fcctop100.herokuapp.com/api/fccusers/top/recent";
var urlTotal = "http://fcctop100.herokuapp.com/api/fccusers/top/alltime";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {data:[], url: urlRecent};
	}

	loadLeaders() {
		$.ajax({
			url: this.state.url,
			datatype: 'json',
			success: (data) => {
				this.setState({data: data});
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		})
	}

	componentDidMount() {
		this.loadLeaders();
//should this be polling?
	}

//TODO click handler update the ajax url based on which leaderboard type of selected; 
//use state to store current url

	handleClickMonthPoints(event) {
		event.preventDefault();
		this.setState({url: urlRecent}, () => {
			//had to place this into a callback otherwise the old url would be used for 1-2 clicks
			this.loadLeaders();
		});
	}

	handleClickTotalPoints(event) {
		event.preventDefault();
		this.setState({url: urlTotal}, () => {
			this.loadLeaders();
		});
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

				<MModal />

				<div className="row footer">
					<div className="col-xs-12 col-sm-12">
						<p className="text-center">Brought to you with <i className="fa fa-heart"></i><br /> 
							from <a href="http://www.carolchung.com" target="_blank">Tusk Tusk Dev.</a><br />
							<a href="https://github.com/cch5ng/fcc-leaderboard" target="_blank">(source)</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

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
 
var MModal = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function(event) {
  	//event.preventDefault();
    this.setState({modalIsOpen: false});
  },

  saveRecipe: function(event) {
  	event.preventDefault();
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
  	console.log('ingredientsTrim: ' + ingredientsTrim);
  	console.log('length 0: ' + ingredientsTrim[0].length);
  	console.log('length 1: ' + ingredientsTrim[1].length);
  },

  setName: function(event) {
  	//var name = event.target.recipeName.value;
  	//this.setState({name: name});
  },
 
  render: function() {
    return (
      <div>
        <button onClick={this.openModal}>Add Recipe</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
 
          <p className="h4">Add a recipe <i className="fa fa-times" onClick={this.closeModal}></i></p>
          {/*<button onClick={this.closeModal}>X</button>*/}

          <form>
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
