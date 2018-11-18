import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WelcomePage from "./WelcomePage";
import AppHeader from "../components/AppHeader";

class MenuPage extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                <Link to="/welcome">back</Link>
                <div className="container">

                    MenuPage

                </div>
            </div>
        )
    }
}

export default MenuPage;
