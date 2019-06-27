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
//import '../../css/homePage.css'
//import Loading from "../components/Loading";

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
            isBluetoothEnabled: undefined
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
                        <div>
                            <div className='test-list'>
                                {this.state.isWiFiEnabled ?
                                    <div className="alert alert-danger">1.Wi-Fi : Enabled
                                        <button className="btn btn-light btn-cust" onClick={this.disableWiFi}>
                                            Disable Wi-Fi
                                        </button>
                                    </div>
                                    :
                                    <div className="alert alert-success">1.Wi-Fi : Disabled</div>}
                            </div>
                            <div className='test-list'>
                                {this.state.isBluetoothEnabled ?
                                    <div className="alert alert-danger"> 2.Bluetooth : Enabled
                                        <button className="btn btn-light btn-cust" onClick={this.disableBluetooth}>
                                            Disable Bluetooth
                                        </button>
                                    </div>
                                    :
                                    <div className="alert alert-success">2.Bluetooth : Disabled</div>}
                            </div>
                            {/* <div className='test-list'>
                                {this.state.isFirewallEnabled ?
                                    <div className="alert alert-danger">
                                        3.Firewall : Enabled
                                        <button className="btn btn-light btn-cust" onClick={this.disableFirewall}>
                                            Disable Firewall
                                        </button>
                                    </div>
                                    :
                                    <div className="alert alert-success">3.Firewall : Disabled</div>}
                            </div> */}
                            <div className="row justify-content-center">
                                <Button available={true} text={t.SCAN_APPLIANCES} onClick={this.clickOnScanBtn}/>
                            </div>
                        </div>
                    </div>
                    {redirect ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default WelcomePage;
