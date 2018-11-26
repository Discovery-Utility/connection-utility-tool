import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";

class AvailableAppliancesPage extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                <div className="appliances-header ">
                    <div className="available-appliances-title d-inline-block">
                        <p>{t.APPLIANCES}</p>
                    </div>
                    <div className="d-inline-block">
                        <img src="./images/refresh.svg"
                             width="20" height="20"
                             className="d-inline-block"
                             alt=""/>
                    </div>
                    <div className="d-inline-block">
                        <p>{t.SCAN_AGAIN}</p>
                    </div>
                </div>

                <div className="container">
                    QuestionPage
                </div>
            </div>
        )
    }
}

export default AvailableAppliancesPage;
