import ReactDOM from "react-dom";
import React from "react";
import Router from './Router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';




ReactDOM.render(<Provider><Router/></Provider>, document.getElementById("program"));
