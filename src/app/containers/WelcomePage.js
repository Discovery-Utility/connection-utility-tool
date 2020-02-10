import React, {Component} from "react";
import AppHeader from "../components/AppHeader";
import t from "./../locales/translation";
import Button from "./../components/Button";
import "../../scss/pages/_welcomepage.scss";

const {shell} = require("electron");
import {Redirect} from "react-router-dom";
import SlideOutMessageDialog from "../components/SlideOutMessageDialog";

/**
 * Welcome page displays welcome message and button to scan the appliances
 */
class WelcomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalBody: null,
            modalTitle: null
        };

        this.state = {
            redirectToSearch: false
        };

        this.getConnectYourLaptop = () => {
            return (
                <div className="wteBlock">
                    <div>{t.CONNECT_LAPTOP_TEXT}</div>
                    <div className="ttText">
                        <ul>
                            <li>{t.CONNECT_LAPTOP_LI1}</li>
                            <li>{t.CONNECT_LAPTOP_LI2}</li>
                        </ul>
                    </div>
                </div>
            );
        };

        this.connectYourLaptop = () => {
            this.setState({
                modalTitle: t.CONNECT_LAPTOP,
                modalBody: this.getConnectYourLaptop()
            });
        };

        this.getDisableNetwork = () => {
            return (
                <div className="wteBlock">
                    <div>{t.DISABLE_NETWORK_TEXT}</div>
                    <br></br>
                    <div>{t.DISABLE_NETWORK_DETAILS_TEXT}</div>
                </div>
            );
        };

        this.clickOnShowDisableNetwork = () => {
            this.setState({
                modalTitle: t.DISABLE_NETWORK,
                modalBody: this.getDisableNetwork()
            });
        };

        this.getDisableFirewallBody = () => {
            return (
                <div className="wteBlock">
                    <div>{t.DISABLE_FIREWALL_TEXT}</div>
                    <br></br>
                    <div>{t.DISABLE_FIREWALL_TEXT2}</div>
                    <br></br>
                    <div>{t.DISABLE_FIREWALL_TEXT3}</div>
                    <br></br>
                    <div>{t.DISABLE_FIREWALL_TEXT4}</div>
                </div>
            );
        };

        this.clickOnShowDisableFirewall = () => {
            this.setState({
                modalTitle: t.DISABLE_FIREWALL,
                modalBody: this.getDisableFirewallBody()
            });
        };

        this.getBackupDiscovery = () => {
            return (
                <div className="wteBlock">
                    <div>{t.BACKUP_DISCOVERY_DESC}</div>
                    <ol type="1">
                        <li>{t.BACKUP_DISCOVERY1}</li>
                        <li>
                            {t.BACKUP_DISCOVERY2}
                            <ul>
                                <li>{t.BACKUP_DISCOVERY2_Li1}</li>
                                <li>{t.BACKUP_DISCOVERY2_Li2}</li>
                                <li>{t.BACKUP_DISCOVERY2_Li3}</li>
                            </ul>
                        </li>
                        <li>{t.BACKUP_DISCOVERY3}</li>
                        <li>
                            {t.BACKUP_DISCOVERY4}
                            <br></br>
                            <br></br>
                            <div>{t.BACKUP_DISCOVERY_COMMAND}</div>
                            <br></br>
                        </li>
                        <li>{t.BACKUP_DISCOVERY5}</li>
                        <li>{t.BACKUP_DISCOVERY6}</li>
                    </ol>
                </div>
            );
        };

        this.clickOnShowBackupDiscovery = () => {
            this.setState({
                modalTitle: t.BACKUP_DISCOVERY,
                modalBody: this.getBackupDiscovery()
            });
        };

        this.clickOnScanBtn = () => {
            this.setState({
                redirectToSearch: true
            });
        };
    }

    render() {
        let redirect = this.state.redirectToSearch;
        return (
            <div>
                <AppHeader />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 className="welcome-page-title">{t.WELCOME_TITLE}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 text-center welcome-page-text">
                            <p>{t.ABOUT_TOOL}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>1.</b> {t.CONNECT_YOUR_LAPTOP}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p
                            className="show-link"
                            id="connectToNetwork"
                            data-toggle="modal"
                            data-target="#modal"
                            onClick={this.connectYourLaptop}
                        >
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>2.</b> {t.WIFI_NETWORKS}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p
                            className="show-link"
                            id="disableWiFi"
                            data-toggle="modal"
                            data-target="#modal"
                            onClick={this.clickOnShowDisableNetwork}
                        >
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>3.</b> {t.PC_FIRE_WALL}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p
                            className="show-link"
                            id="disableFirewall"
                            data-toggle="modal"
                            data-target="#modal"
                            onClick={this.clickOnShowDisableFirewall}
                        >
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>
                    <div className="row justify-content-center scan-appliances">
                        <Button available={true} text={t.SCAN_APPLIANCES} onClick={this.clickOnScanBtn} />
                    </div>

                    <div className="row justify-content-center">
                        <p
                            className="show-link"
                            id="manualDiscovery"
                            data-toggle="modal"
                            data-target="#modal"
                            onClick={this.clickOnShowBackupDiscovery}
                        >
                            {t.SHOW_BACKUP_DISCOVERY}
                        </p>
                    </div>
                    <SlideOutMessageDialog title={this.state.modalTitle} body={this.state.modalBody} />
                    {/*redirect to next page*/}
                    {redirect ? <Redirect to="/search" /> : null}
                </div>
            </div>
        );
    }
}

export default WelcomePage;
