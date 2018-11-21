import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation';
import Button from './../components/Button';
const {shell} = require('electron');
import {Link} from 'react-router-dom'


class WelcomePage extends Component {
    constructor(props) {
        super(props);
        const disableNetworkPath = "http://lmgtfy.com/?q=how+to+disable+network";
        const disableFirewallPath = "http://lmgtfy.com/?q=how+to+disable+firewall+windows+10";

        this.clickOnShowDisableNetwork = () => {
            shell.openExternal(disableNetworkPath);
        };

        this.clickOnShowDisableFirewall = () => {
            shell.openExternal(disableFirewallPath);
        };
    }

    render() {
        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 className="welcomePageTitle">{t.WELCOME_TITLE}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <p>{t.ABOUT_TOOL}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center"><b>1.</b> {t.WIFI_NETWORKS}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="showLink" onClick={this.clickOnShowDisableNetwork}>  {t.SHOW_ME_HOW}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center"><b>2.</b> {t.PC_FIRE_WALL}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="showLink" onClick={this.clickOnShowDisableFirewall}>  {t.SHOW_ME_HOW}</p>
                    </div>
                    <div className="row justify-content-center">
                        <Link to="/search"><Button text={t.SCAN_APPLIANCES} className="customButton"/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomePage;
