import React, {Component} from 'react';
import AppHeader from './AppHeader';
import {ipcRenderer} from "electron";
import {Link, Route} from 'react-router-dom'
import HomePage from './HomePage'
import AboutPage from './AboutPage'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: "text"
        };
    }


    render() {

        /*ipcRenderer.on('ping', (event, arg) => {
            this.changeText(arg);
        });*/


        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <Route path="/home" exact component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                </div>
            </div>
        );
    }
}

export default App;
