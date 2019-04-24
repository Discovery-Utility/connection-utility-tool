import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import InitialChecksContainer from "./InitialChecksContainer";
import t from './../locales/translation';
import Button from './../components/Button';
import '../../scss/pages/_welcomepage.scss'

const {shell} = require('electron');
import {Redirect} from 'react-router-dom'

/**
 * Welcome page displays welcome message and button to scan the appliances
 */
class WelcomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            available: false,
            redirectToSearch: false
        };

        this.clickOnShowDisableNetwork = () => {
            shell.openExternal(disableNetworkPath);
        };

        this.clickOnShowDisableFirewall = () => {
            shell.openExternal(disableFirewallPath);
        };

        this.clickOnScanBtn = () => {
            this.setState({
                redirectToSearch: true
            })
        };

        this.setChecksPassed = (passed) => {
            this.setState({available: passed});
        }
    }

    render() {
        let redirect = this.state.redirectToSearch;
        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <InitialChecksContainer 
                        setChecksPassed={this.setChecksPassed}
                        filterChecks={["wifi", "firewall", "antivirus"]} />
                    <div className="row justify-content-center">
                        <Button available={this.state.available} text={t.SCAN_APPLIANCES} onClick={this.clickOnScanBtn}/>
                    </div>
                    {/*redirect to next page*/}
                    {redirect ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default WelcomePage;
