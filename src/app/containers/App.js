import React, {Component} from 'react';
import AppHeader from '../components/AppHeader';
import {ipcRenderer} from "electron";
import {Link, Route, Redirect, Switch} from 'react-router-dom'
import QuestionPage from './QuestionPage'
import MenuPage from './MenuPage'
import WelcomePage from './WelcomePage'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appStarted: "text"
        };
    }


    render() {

        /*ipcRenderer.on('ping', (event, arg) => {
            this.changeText(arg);
        });*/


        return (
            <Redirect to="/welcome"/>
        );
    }
}

export default App;
