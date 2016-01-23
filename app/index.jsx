//app/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './fixed-data-table.css';

require("!style!css!sass!./main.scss");
require("!css!./fixed-data-table.css");

var css = require("!css!sass!./main.scss");

ReactDOM.render(<App url="http://fcctop100.herokuapp.com/api/fccusers/top/recent" />, document.getElementById('app'));