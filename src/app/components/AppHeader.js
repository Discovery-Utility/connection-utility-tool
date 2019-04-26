import React, {Component} from 'react';
import {appTitle} from "../locales/translation";
import './../../bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, Redirect} from 'react-router-dom'

/**
 * AppHeader displayed in the application header.
 * Contains links to Welcome, Logs, Help pages
 *
 * TODO replace bootstrap grid to flex.
 */


class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToWelcomePage: false
        };

        /*
        * Click on the DELL EMC logo
        * */
        this.brandClick = () => {
            this.setState({
                redirectToWelcomePage: true
            });
        };

        this.redirected = () => {
            console.log('redirected');
            this.setState({
                redirectToWelcomePage: false
            });
        }
    }

    render() {

        // let redirectToWelcomePage = this.state.redirectToWelcomePage;
        //console.log(this.state.redirectToWelcomePage);
        return (
            <div>
                <nav className="navbar navbar-light header">
                    <span className="navbar-brand logo" onClick={this.brandClick}/>
                    <div className="vertical-line"/>
                    <span className="application-title navbar-text navbar-left text-left" id="appTitle">
                    {appTitle}
                </span>
                    <div className="col-xl-7 col-lg-6 col-md-5 col-sm-3"/>

                    <Link to='/log'>
                        <img src="./images/menu.svg"
                             width="25" height="25"
                             className="d-inline-block align-top"
                             alt=""/>
                    </Link>

                    <Link to='/help'>
                        <img src="./images/question.svg"
                             width="25" height="25"
                             className="d-inline-block align-top"
                             alt=""/>
                    </Link>
                </nav>
                {this.state.redirectToWelcomePage ?
                    <div>
                        {this.state.redirectToWelcomePage=false}
                    <Redirect to="/welcome"/>
                    </div>: null}
            </div>
        );
    }
}

export default AppHeader;

