import React, {Component} from "react";
import AppHeader from "../components/AppHeader";
import t from "./../locales/translation";
import Button from "./../components/Button";
const {shell} = require("electron");
import {Redirect} from "react-router-dom";
import Alert from "../components/Alert";
import "../../scss/pages/_rescanpage.scss";
import SlideOutMessageDialog from "../components/SlideOutMessageDialog";

//TODO delete bootstrap grid from this page, use Flex

/**
 * RescanPage displays then appliances not found.
 */
class RescanPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: true,
            redirectToSearch: false,
            modalBody: null,
            modalTitle: null
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

        this.clickOnAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        this.clickOnReScanBtn = () => {
            this.setState({
                redirectToSearch: true
            });
        };
    }

    render() {
        let redirectToSearch = this.state.redirectToSearch;

        return (
            <div>
                <AppHeader />
                <div className="container">
                    {this.state.showAlert ? (
                        <div className="row justify-content-center">
                            <Alert onClick={this.clickOnAlert} type="error" className="col-auto" title={t.ERROR} text={t.ERROR_MESSAGE} />
                        </div>
                    ) : null}

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

                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>1.</b> {t.CONNECT_YOUR_LAPTOP}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.connectYourLaptop}>
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>2.</b> {t.WIFI_NETWORKS}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.clickOnShowDisableNetwork}>
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center">
                            <b>3.</b> {t.PC_FIRE_WALL}
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.clickOnShowDisableFirewall}>
                            {t.SHOW_ME_HOW}
                        </p>
                    </div>

                    <div className="row justify-content-center scan-appliances">
                        <Button available="true" text={t.RESCAN_APPLIANCES} onClick={this.clickOnReScanBtn} />
                    </div>

                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.clickOnShowBackupDiscovery}>
                            {t.SHOW_BACKUP_DISCOVERY}
                        </p>
                    </div>
                    <SlideOutMessageDialog title={this.state.modalTitle} body={this.state.modalBody} />

                    {redirectToSearch ? <Redirect to="/search" /> : null}
                </div>
            </div>
        );
    }
}

export default RescanPage;
