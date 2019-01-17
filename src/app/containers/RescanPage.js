import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation';
import Button from './../components/Button';
const {shell} = require('electron');
import {Redirect} from 'react-router-dom'
import Alert from "../components/Alert";
import '../../scss/pages/_rescanpage.scss'

const disableNetworksUrl = "http://lmgtfy.com/?q=how+to+disable+network";
const disableFirewallUrl = "http://lmgtfy.com/?q=how+to+disable+firewall+windows+10";
const disableCiscoUrl = "http://lmgtfy.com/?q=how+to+disable+firewall+windows+10";
const disableSecuritylUrl = "http://lmgtfy.com/?q=how+to+disable+firewall+windows+10";

//TODO delete bootstrap grid from this page, use Flex

/**
 * RescanPage displays then appliances not found.
 */
class RescanPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: true,
            redirectToSearch: false
        };

        this.clickOnShowDisableNetworks = () => {
            shell.openExternal(disableNetworksUrl);
        };

        this.clickOnShowDisableFirewall = () => {
            shell.openExternal(disableFirewallUrl);
        };

        this.clickOnShowDisableCisco = () => {
            shell.openExternal(disableCiscoUrl);
        };

        this.clickOnShowDisableSecurity = () => {
            shell.openExternal(disableSecuritylUrl);
        };

        this.clickOnAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        this.clickOnReScanBtn = () => {
          this.setState({
              redirectToSearch: true
          })
        }
    }

    render() {
        let redirectToSearch = this.state.redirectToSearch;

        return (
            <div>
                <AppHeader/>
                <div className="container">
                    {this.state.showAlert ?
                        <div className="row justify-content-center">
                            <Alert onClick={this.clickOnAlert} type="error"
                                   className="col-auto"
                                   title={t.ERROR}
                                   text={t.ERROR_MESSAGE}/></div> : null}

                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 className="rescan-page-title">{t.ERROR_PAGE_TITLE}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <p>{t.DISABLE_ALL}</p>
                        </div>
                    </div>


                    <div className="row">
                        <p className="offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4">
                            <b>1.</b> {t.PC_FIRE_WALL_EXTENDED}</p>
                    </div>
                    <div className="row">
                        <p className="show-link offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"
                           onClick={this.clickOnShowDisableFirewall}>{t.SHOW_ME_HOW}</p>
                    </div>

                    <div className="row">
                        <p className="offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4">
                            <b>2.</b> {t.DISABLE_CISCO_MESSAGE}</p>
                    </div>
                    <div className="row">
                        <p className="show-link offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"
                           onClick={this.clickOnShowDisableCisco}>{t.SHOW_ME_HOW}</p>
                    </div>

                    <div className="row">
                        <p className="offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"><b>3.</b> {t.DISABLE_NETWORKS}
                        </p>
                    </div>
                    <div className="row">
                        <p className="show-link offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"
                           onClick={this.clickOnShowDisableNetworks}>{t.SHOW_ME_HOW}</p>
                    </div>

                    <div className="row">
                        <p className="offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"><b>4.</b> {t.SECURITY_APPS}</p>
                    </div>
                    <div className="row">
                        <p className="show-link offset-xs-1 offset-sm-2 offset-md-3 offset-lg-4"
                           onClick={this.clickOnShowDisableSecurity}>{t.SHOW_ME_HOW}</p>
                    </div>

                    <div className="row justify-content-center">
                        <Button available="true" text={t.RESCAN_APPLIANCES} onClick={this.clickOnReScanBtn}/>
                    </div>

                    {redirectToSearch ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default RescanPage;
