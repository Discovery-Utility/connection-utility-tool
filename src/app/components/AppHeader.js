import React, {Component} from 'react';
import {appTitle} from "../locales/translation";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link} from 'react-router-dom'


class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-light header">
                <span className="navbar-brand logo"/>
                <div className="verticalLine"/>
                <span className="appTitle navbar-text navbar-left text-left" id="appTitle">
                    {appTitle}
                </span>
                <div className="col-xl-7 col-lg-6 col-md-5 col-sm-3"/>

                <Link to='/menu'>
                    <img src="./images/menu.svg"
                         width="25" height="25"
                         className="d-inline-block align-top"
                         alt=""/>
                </Link>

                <Link to='/question'>
                    <img src="./images/question.svg"
                         width="25" height="25"
                         className="d-inline-block align-top"
                         alt=""/>
                </Link>

            </nav>

        );
    }
}

export default AppHeader;

