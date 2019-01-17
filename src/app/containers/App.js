import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

/**
 * Default root component in application.
 * App component redirect to WelcomePage container.
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Redirect to="/welcome"/>
        );
    }
}

export default App;
