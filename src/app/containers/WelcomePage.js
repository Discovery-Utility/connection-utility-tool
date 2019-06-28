import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation';
import Button from './../components/Button';
import '../../scss/pages/_welcomepage.scss'
const {shell} = require('electron');
import {Redirect} from 'react-router-dom'
import {check_wifi, disable_wifi} from "../scripts/wifi";
import {check_bluetooth, disable_bluetooth} from "../scripts/bluetooth";
import {check_firewall, disable_firewall} from "../scripts/firewall";

//const COUNT_SECONDS = env.SEARCH_DELAY;
/**
 * Welcome page displays welcome message and button to scan the appliances
 */
class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToSearch: false,
            redirectToErrorPage: false,
            isWiFiEnabled: undefined,
            isFirewallEnabled: undefined,
            isBluetoothEnabled: undefined,
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
        disable_wifi();
        this.setState({isWiFiEnabled: false})
    }

    disableFirewall() {
        disable_firewall();
        this.setState({isFirewallEnabled: false})
    }

    disableBluetooth() {
        disable_bluetooth();
        this.setState({isBluetoothEnabled: false})
    }

    checkAll() {
        check_wifi().then(res => {
            this.setState({isWiFiEnabled: res})
        });
        check_firewall().then(res => {
            this.setState({isFirewallEnabled: res})
        });
        check_bluetooth().then(res => {
            this.setState({isBluetoothEnabled: res})
        });
    };

    componentDidMount() {
        this.checkAll();
        setInterval(() => this.checkAll(), 3000);
    }

    render() {

        let redirect = this.state.redirectToSearch;

        let wifiRenderBlock = null;
        let bluetoothRenderBlock = null;
        let firewallRenderBlock = null;

        // Check WiFi state, generate tags
        if (this.state.isWiFiEnabled) {
            wifiRenderBlock = <h6> Wi-Fi : <b className="red"> enabled </b>
                                <img src={require('../../images/disable2.svg')} width="20" height="20"
                                     className="d-inline-block pb-1"
                                     onClick={this.disableWiFi} alt="disable"/>
                                </h6>;
        }
        else {
            wifiRenderBlock = <h6> Wi-Fi : disabled </h6>;
        }

        // Check Bluetooth state, generate tags
        if(this.state.isBluetoothEnabled){
            if(this.state.platform === 'win32') {
                bluetoothRenderBlock = <h6> Bluetooth : <b className="red"> enabled </b></h6>;
            }
            else {
                bluetoothRenderBlock = (<h6> Bluetooth : <b className="red"> enabled    </b>
                                        <img src={require('../../images/disable2.svg')} width="20" height="20"
                                             className="d-inline-block pb-1"
                                             onClick={this.disableBluetooth} alt="disable"/>
                                        </h6>);
            }
        }
        else {
            bluetoothRenderBlock = <h6> Bluetooth : disabled </h6>;
        }

        // Check Firewall state, generate tags
        if (this.state.platform === 'win32'){
            if(this.state.isFirewallEnabled)
                firewallRenderBlock = <h6> Firewall : <b className="red"> enabled </b> </h6>;
            else
                firewallRenderBlock = <h6> Firewall : disabled </h6>;
        }
        else {
            firewallRenderBlock = null;
        }

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
                            { wifiRenderBlock }
                            { bluetoothRenderBlock }
                            { firewallRenderBlock }
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
