import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";
import Appliance from './../components/Appliance'


class AppliancesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appliances: [],
            configured: [],
            unconfigured: [],
            state_available: true    //used for switch available/configured screen states
        };

        this.changeScreenState = () => {
            this.setState({
                state_available: !this.state.state_available
            });
        };

    }

    componentDidMount() {
        let appliances = JSON.parse(localStorage.getItem("message"));

        if (appliances) {
            let configured = appliances.storages.filter(appliance => appliance.state === "configured");
            let unconfigured = appliances.storages.filter(appliance => appliance.state === "unconfigured");
            this.setState({
                appliances: appliances,
                configured: configured,
                unconfigured: unconfigured,
            });
        }
    }

    render() {
        let unconfigured = this.state.unconfigured;

        return (
            <div>
                <AppHeader/>
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
                    <div className="row">
                        <p onClick={this.changeScreenState}
                           className="change-available-configured">{this.state.state_available ? t.AVAILABLE : t.CONFIGURED}</p>
                    </div>

                    <div className="row">
                        {this.state.state_available ? <p>{t.SELECT_APPLIANCES}</p> : null}
                    </div>

                    <div className="row">
                        <div className="appliances-list">
                            {unconfigured.map(appliance => <Appliance appliance={appliance} type="" name=""/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
