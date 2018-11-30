import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";
import Appliance from './../components/Appliance'
import Button from "../components/Button";

const MAX_SELECT_APPLIANCES = 4;

const {shell} = require('electron');


class AppliancesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appliances: [],
            configured: [],
            selected_ids: [],
            unconfigured: [],
            stateAvailable: true,    //used for switch available/configured screen states
            showCreateClusterMessage: false

        };

        this.changeScreenState = () => {
            this.setState({
                stateAvailable: !this.state.stateAvailable
            });
        };

        this.addSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected.push(selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        this.removeSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected = selected.filter((id) => id !== selectionId)
            this.setState({
                selected_ids: selected
            });
        };

        this.createClusterClick = () => {
            this.setState({
                showCreateClusterMessage: true
            });
        };

        this.continueClick = () => {
            let {selected_ids, unconfigured} = this.state;
            let link = "https://google.com";
            selected_ids.forEach((id) => {
                let redirect = false;
                unconfigured.forEach((appliance) => {
                   if (id === appliance.id) {
                       link = appliance.link;
                       redirect = true;
                   }
                });
                if (redirect) {
                    shell.openExternal(link);
                }
            });

            this.setState({
                showCreateClusterMessage: false
            });
        };

        this.cancelClick = () => {
            this.setState({
                showCreateClusterMessage: false
            });
        }

    }

    componentDidMount() {
        let appliances = JSON.parse(localStorage.getItem("message")).storages;

        if (appliances) {
            let id = 0;
            appliances.forEach((appliance) => appliance.id = id++);

            for (let i = 0; i < appliances.length; i++) {
                appliances[i].id = i;
            }

            let configured = appliances.filter(appliance => appliance.state === "configured");
            let unconfigured = appliances.filter(appliance => appliance.state === "unconfigured");

            this.setState({
                appliances: appliances,
                configured: configured,
                unconfigured: unconfigured,
            });
        }
    }

    render() {
        let {unconfigured, selected_ids, showCreateClusterMessage} = this.state;
        let showCreateClusterButton = false;
        let countSelectedAppliances = selected_ids.length;
        if (countSelectedAppliances > 0 && countSelectedAppliances <= MAX_SELECT_APPLIANCES) {
            showCreateClusterButton = true;
        }


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
                           className="change-available-configured">{this.state.stateAvailable ? t.AVAILABLE : t.CONFIGURED}</p>
                    </div>

                    <div className="row">
                        {this.state.stateAvailable ? <p>{t.SELECT_APPLIANCES}</p> : null}
                    </div>

                    <div className="row">
                        {this.state.stateAvailable ? <div className="appliances-list">
                            {unconfigured.map(appliance => {
                                let active = false;

                                selected_ids.forEach((element) => {
                                    if (element === appliance.id) {
                                        active = true;
                                    }
                                });

                                return (<Appliance addSelection={this.addSelection}
                                                   removeSelection={this.removeSelection}
                                                   key={appliance.id}
                                                   appliance={appliance}
                                                   active={active}/>);
                            })}
                        </div> : null}
                    </div>

                    {showCreateClusterButton ?
                        <div className="shadow create-cluster-popup">
                            <p className="popup-selected-text">{countSelectedAppliances} {countSelectedAppliances === 1 ? t.APPLIANCE_SELECTED : t.APPLIANCES_SELECTED}</p>
                            <Button text={t.CREATE_CLUSTER} className="popup-create-cluster-button"
                                    onClick={this.createClusterClick}/>
                        </div> : null}
                    {showCreateClusterMessage ? <div className="create-cluster-screen">
                        <h1>Almost there!</h1>
                        <p>To complete the process, you will be leaving the discovery tool and opening Trident to complete
                        the setup process</p>
                        <b>You can disconnect from the hardware.</b>
                        <Button text="Continue" onClick={this.continueClick} className="create-cluster-screen-continue"/>
                        <p onClick={this.cancelClick} className="create-cluster-screen-cancel">Back</p>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
