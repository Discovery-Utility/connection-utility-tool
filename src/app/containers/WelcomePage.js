import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation';
import Button from './../components/Button';
import '../../scss/pages/_welcomepage.scss'
const {shell} = require('electron');
import {Redirect} from 'react-router-dom'
import {checkWifi, disableWifi} from "../scripts/wifi";
import {checkBluetooth, disableBluetooth} from "../scripts/bluetooth";
import {checkFirewall, disableFirewall} from "../scripts/firewall";

/**
 * Welcome page displays welcome message and button to scan the appliances
 */

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToSearch: false,
            redirectToErrorPage: false,
            isWiFiEnabled: false,
            isFirewallEnabled: false,
            isBluetoothEnabled: false,
            platform: process.platform
        };

        this.clickOnScanBtn = () => {
            this.setState({
                redirectToSearch: true
            })
        };

        this.clickOnCancelBtn = () => {
            this.setState({
                redirectToErrorPage: true
            })
        };
        this.disableWiFi = this.disableWiFi.bind(this);
        this.disableFirewall = this.disableFirewall.bind(this);
        this.disableBluetooth = this.disableBluetooth.bind(this);
        this.checkAll = this.checkAll.bind(this);
    }

    disableWiFi() {
        disableWifi();
        this.setState({isWiFiEnabled: false})
    }

    disableFirewall() {
        disableFirewall();
        this.setState({isFirewallEnabled: false})
    }

    disableBluetooth() {
        disableBluetooth();
        this.setState({isBluetoothEnabled: false})
    }

    checkAll() {
        checkWifi().then((res) => {
            this.setState({isWiFiEnabled: res})
        });
        checkFirewall().then((res) => {
            this.setState({isFirewallEnabled: res})
        });
        checkBluetooth().then((res) => {
            this.setState({isBluetoothEnabled: res})
        });
    }

    componentDidMount() {
        this.checkAll();
        setInterval(() => this.checkAll(), 3000);
    }

    getWifiRenderBlock() {
        if (this.state.isWiFiEnabled) {
            return <h6> Wi-Fi : <b className="red"> enabled </b>
                <img src={require('../../images/disable2.svg')} width="20" height="20"
                     className="d-inline-block pb-1" onClick={this.disableWiFi} alt="disable"/>
                </h6>;
        }
        return <h6> Wi-Fi : disabled </h6>;
    }

    getBluetoothRenderBlock() {
        if(this.state.isBluetoothEnabled){
            if(this.state.platform === 'win32') {
                return <h6> Bluetooth : <b className="red"> enabled </b></h6>;
            } else {
                return <h6> Bluetooth : <b className="red"> enabled    </b>
                    <img src={require('../../images/disable2.svg')} width="20" height="20"
                         className="d-inline-block pb-1" onClick={this.disableBluetooth} alt="disable"/>
                    </h6>;
            }
        }
        return <h6> Bluetooth : disabled </h6>;
    }

    getFirewallRenderBlock() {
        if (this.state.platform === 'win32') {
            if(this.state.isFirewallEnabled) {
                return <h6> Firewall : <b className="red"> enabled </b></h6>;
            } else {
                return <h6> Firewall : disabled </h6>;
            }
        }
        return null;
    }

    render() {
        let redirect = this.state.redirectToSearch;

        return (
            <div>
                <AppHeader/>
                <div className="container">
                    <div className="scroll">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <h1 className="welcome-page-title">{t.WELCOME_TITLE}</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-4 text-center">
                                <p>{t.ABOUT_TOOL}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            {this.getWifiRenderBlock()}
                            {this.getBluetoothRenderBlock()}
                            {this.getFirewallRenderBlock()}
                        </div>
                        <div className="row justify-content-center">
                            <Button available={true} text={t.SCAN_APPLIANCES} onClick={this.clickOnScanBtn}/>
                        </div>
                    </div>
                    {redirect ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default WelcomePage;
