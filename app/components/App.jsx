//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
//import {Table, Column, Cell} from 'fixed-data-table';
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
							<a className="navbar-brand" href="#">
								<img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="learn to code javascript at Free Code Camp logo" className="img-responsive nav-logo" />
							</a>
						</div>
					</nav>
				</div>

				<div className="row">
					<h2 className="center">Leaderboard</h2>
				</div>

				<Table data={this.state.data}
					rowsCount={this.state.data.length}
					rowHeight={40}
					headerHeight={45}
					width={680}
					height={4050} className="center">

					<Column
						header={<Cell>#</Cell>}
						cell={props => (
							<Cell {...props}>
								{props.rowIndex + 1}
							</Cell>
						)}
						width={50}
					/>
					<Column
						header={<Cell>Camper Name</Cell>}
						cell={props => (
							<Cell {...props}>
								<img src={this.state.data[props.rowIndex].img} alt="camper avatar" className="avatar"/> {this.state.data[props.rowIndex].username}
							</Cell>
						)}
						width={300}
					/>
					<Column
						header={<Cell onClick={this.handleClickMonthPoints.bind(this)} 
								className="dynamic-header" >
									Points (last month) 
									<i className={this.state.url === urlRecent ? "fa fa-caret-down" : "hide-fa"}></i>
								</Cell>}
						cell={props => (
							<Cell {...props}>
							  {this.state.data[props.rowIndex].recent}
							</Cell>
						)}
						width={165}
					/>
					<Column
						header={<Cell onClick={this.handleClickTotalPoints.bind(this)}
								className="dynamic-header" >
								Points (total) 
								<i className={this.state.url === urlTotal ? "fa fa-caret-down" : "hide-fa"}></i>
								</Cell>}
						cell={props => (
							<Cell {...props}>
							  {this.state.data[props.rowIndex].alltime}
							</Cell>
						)}
						width={165}
					/>
				</Table>

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

// App.propTypes = { initialContent: React.PropTypes.string };
// App.defaultProps = { initialContent: '', initialMd: ''};