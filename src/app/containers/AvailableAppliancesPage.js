import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";

class AvailableAppliancesPage extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                {/*<div className="container-fluid appliances-header">
                    <div className="row">
                        <div className="col-3 col-lg-2 available-appliances-title">
                            {t.APPLIANCES}
                        </div>
                        <div className="col-xl-7 col-lg-6 col-md-5 col-sm-3"/>
                        <div className= "col-1 available-appliances-rescan">
                            <img src="./images/refresh.svg"
                                 width="20" height="20"
                                 alt="refresh-ico"/>

                        </div>
                        <div className="col-auto available-appliances-rescan-text">
                            {t.SCAN_AGAIN}
                        </div>
                    </div>
                </div>*/}

                <div className="appliances-header">
                    <div className="available-appliances-title">
                        {t.APPLIANCES}
                    </div>

                    <div className="available-appliances-rescan">
                        <img src="./images/refresh.svg"
                             width="20" height="20"
                             alt="refresh-ico"/>

                    </div>
                    <Link to="/search">
                        <div className="available-appliances-rescan-text">
                            {t.SCAN_AGAIN}
                        </div>
                    </Link>

                </div>

                <div className="container">
                    QuestionPage
                </div>
            </div>
        )
    }
}

export default AvailableAppliancesPage;
