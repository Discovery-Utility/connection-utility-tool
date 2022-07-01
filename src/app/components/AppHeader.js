import React, {Component} from "react";
import {appTitle} from "../locales/translation";
import "./../../bootstrap/scss/bootstrap.scss";
import {Link, Redirect} from "react-router-dom";

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
         */
        this.brandClick = () => {
            this.setState({
                redirectToWelcomePage: true
            });
        };
    }

    render() {
        let redirectToWelcomePage = this.state.redirectToWelcomePage;
        return (
            <div>
                <nav className="navbar navbar-light header">
                    <span className="navbar-brand logo" onClick={this.brandClick} />
                    <div className="vertical-line" />
                    <span className="application-title navbar-text navbar-left text-left" id="appTitle">
                        {appTitle}
                    </span>
                    <div className="col-xl-6 col-lg-5 col-md-4 col-sm-2" />

                    <Link to="/log">
                        <img src="./images/menu.svg" width="25" height="25" className="d-inline-block align-top" alt="" />
                    </Link>

                    <Link to="/help">
                        <img src="./images/question.svg" width="25" height="25" className="d-inline-block align-top" alt="" />
                    </Link>
                </nav>
                {redirectToWelcomePage ? <Redirect to="/welcome" /> : null}
            </div>
        );
    }
}

export default AppHeader;
