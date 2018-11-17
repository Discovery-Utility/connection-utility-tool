import React, {Component} from 'react';
import {appTitle} from "./locales/translation";
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
                <div className="col-lg-7 col-md-6 col-sm-3"/>

                <Link to='/home'>
                    <img src="./images/menu.svg"
                         width="30" height="30"
                         className="d-inline-block align-top"
                         alt=""/>
                </Link>

                <Link to='/about'>
                    <img src="./images/question.svg"
                         width="30" height="30"
                         className="d-inline-block align-top"
                         alt=""/>
                </Link>

            </nav>

        );
    }
}

export default AppHeader;

/* <div className="row header">
                <div className="col-sm-2 logo"/>
                <div className="col-sm-1 verticalLine"/>
                <p className="col-3 appTitle">{appTitle}</p>
                <div className="col-1 menu" />
                <div className="col-1 question" />
            </div>*/
