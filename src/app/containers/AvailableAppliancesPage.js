import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";

class AvailableAppliancesPage extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                {/*<div className="row align-items-center appliancesHeader">
                    <p className="col-1 availableAppliancesTitle">{t.APPLIANCES}</p>
                    <div className="offset-7 col-1">
                        <img src="./images/refresh.svg"
                             width="25" height="25"
                             className=""
                             alt=""/>
                    </div>
                    <p className="col-2">{t.SCAN_AGAIN}</p>
                </div>*/}

                <div className="container-fluid appliancesHeader">
                    <div className="row align-items-center">
                        <div className="col">
                            <p className="availableAppliancesTitle">{t.APPLIANCES}</p>
                        </div>
                        <div className="col">
                            <img src="./images/refresh.svg"
                                 width="22" height="22"
                                 className="headerRefreshIco"
                                 alt="refresh ico"/>
                        </div>
                        <div className="col">
                            <p>{t.SCAN_AGAIN.toUpperCase()}</p>
                        </div>
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
