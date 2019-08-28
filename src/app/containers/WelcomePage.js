import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation';
import Button from './../components/Button';
import '../../scss/pages/_welcomepage.scss'

const {shell} = require('electron');
import {Redirect} from 'react-router-dom'
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

        this.connectYourLaptop = () => {
            this.setState({
                modalTitle: t.CONNECT_LAPTOP,
                modalBody: t.CONNECT_LAPTOP_TEXT
            })
        };

        this.clickOnShowDisableNetwork = () => {
            this.setState({
                modalTitle: t.DISABLE_NETWORK,
                modalBody: t.DISABLE_NETWORK_TEXT
            })
        };

        this.clickOnShowDisableFirewall = () => {
            this.setState({
                modalTitle: t.DISABLE_FIREWALL,
                modalBody: t.DISABLE_FIREWALL_TEXT
            })
        };

        this.clickOnScanBtn = () => {
            this.setState({
                redirectToSearch: true
            })
        };
    }

    render() {

        let redirect = this.state.redirectToSearch;
        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 className="welcome-page-title">{t.WELCOME_TITLE}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 text-center">
                            <p>{t.ABOUT_TOOL}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center"><b>1.</b> {t.CONNECT_YOUR_LAPTOP}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.connectYourLaptop}>  {t.SHOW_ME_HOW}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center"><b>2.</b> {t.WIFI_NETWORKS}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.clickOnShowDisableNetwork}>  {t.SHOW_ME_HOW}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="text-center"><b>3.</b> {t.PC_FIRE_WALL}</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="show-link" data-toggle="modal" data-target="#modal" onClick={this.clickOnShowDisableFirewall}>  {t.SHOW_ME_HOW}</p>
                    </div>
                    <div className="row justify-content-center">
                        <Button available={true} text={t.SCAN_APPLIANCES} onClick={this.clickOnScanBtn}/>
                    </div>
                    <SlideOutMessageDialog title={this.state.modalTitle} body={this.state.modalBody}/>
                    {/*redirect to next page*/}
                    {redirect ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default WelcomePage;
