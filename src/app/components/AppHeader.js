import React, {Component} from 'react';
import {appTitle} from "../locales/translation";
import './../../bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.js';
import {Link, Redirect} from 'react-router-dom'


class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRedirect: false
        };

        this.brandClick = () => {
            this.setState({
                showRedirect: true
            });
        }
    }

    render() {
        let redirect = this.state.showRedirect;
        return (
            <div>
                <nav className="navbar navbar-light header">
                    <span className="navbar-brand logo" onClick={this.brandClick}/>
                    <div className="verticalLine"/>
                    <span className="appTitle navbar-text navbar-left text-left" id="appTitle">
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
                {redirect ? <Redirect to="/welcome"/> : null}
            </div>
        );
    }
}

export default AppHeader;

