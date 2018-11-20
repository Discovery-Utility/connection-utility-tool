import React, {Component} from 'react';
import {ipcRenderer} from "electron";
import {Redirect} from 'react-router-dom'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appStarted: "text"
        };
    }

    render() {

        /*ipcRenderer.on('ping', (event, arg) => {
            console.log(arg);
        });*/

        return (
            <Redirect to="/welcome"/>
        );
    }
}

export default App;
