import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Link} from "react-router-dom";
import Appliance from './../components/Appliance'
import Button from "../components/Button";

const MAX_SELECT_APPLIANCES = 4;
const MAX_APPLIANCES_ON_PAGE = 5;

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
            showCreateClusterMessage: false,
            countConfiguredPages: 0,
            countUnconfiguredPages: 0
        };

        this.changeScreenState = () => {
            this.setState({
                stateAvailable: !this.state.stateAvailable,
                selected_ids: []
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

            let countSelected = selected_ids.length;
            let firstAppliance = unconfigured.filter((appliance) => {
                return appliance.id === selected_ids[0]
            });

            let names = "";
            for (let i = 0; i < countSelected; i++) {
                let nextAppliance = unconfigured.filter((appliance) => {
                    return appliance.id === selected_ids[i];
                });


                names += nextAppliance[0].name;
                names += i < countSelected - 1 ? "," : "";
            }
            let link = firstAppliance[0].link + "/?appliances=" + names;
            shell.openExternal(link);
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

            let configured = appliances.filter(appliance => appliance.state === "configured" || appliance.state === "service state");
            let unconfigured = appliances.filter(appliance => appliance.state === "unconfigured" );

            let countConfiguredPages = Math.ceil(configured.length / MAX_APPLIANCES_ON_PAGE);
            let countUnconfiguredPages = Math.ceil(unconfigured.length / MAX_APPLIANCES_ON_PAGE);

            this.setState({
                appliances: appliances,
                configured: configured,
                unconfigured: unconfigured,
                countConfiguredPages: countConfiguredPages,
                countUnconfiguredPages: countUnconfiguredPages
            });
        }
    }

    render() {
        let {unconfigured, selected_ids, showCreateClusterMessage, configured, stateAvailable} = this.state;

        let showCreateClusterButton = false;
        let countSelectedAppliances = selected_ids.length;
        let isAvailableBtnCreateCluster = true;
        if (countSelectedAppliances > 0 && stateAvailable) {
            showCreateClusterButton = true;
            if (countSelectedAppliances > MAX_SELECT_APPLIANCES) {
                isAvailableBtnCreateCluster = false;
            }
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
                            {t.SCAN_AGAIN.toUpperCase()}
                        </div>
                    </Link>

                </div>

                <div className="container">
                    <div className="row">
                        <p className="change-available-configured">{stateAvailable ? t.AVAILABLE : t.CONFIGURED}</p>
                        <label className="switch">
                            <input onClick={this.changeScreenState} type="checkbox"/>
                            <span className="slider round"/>
                        </label>
                    </div>

                    <div className="row">
                        {this.state.stateAvailable ? <p>{t.SELECT_APPLIANCES}</p> : null}
                    </div>

                    <div className="row">
                        <div className="appliances-list">
                            {this.state.stateAvailable ?
                                unconfigured.map(appliance => {
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
                                })
                                : configured.map(appliance => {
                                    let active = false;
                                    selected_ids.forEach(element => {
                                        if (element === appliance.id) {
                                            active = true;
                                        }
                                    });
                                    return (<Appliance addSelection={this.addSelection}
                                                       removeSelection={this.removeSelection}
                                                       key={appliance.id}
                                                       appliance={appliance}
                                                       active={active}/>)
                                })}
                        </div>
                    </div>

                    {showCreateClusterButton ?
                        <div className="shadow create-cluster-popup">
                            <p className="popup-selected-text">{countSelectedAppliances} {countSelectedAppliances === 1 ? t.APPLIANCE_SELECTED : t.APPLIANCES_SELECTED}</p>
                            <Button text={t.CREATE_CLUSTER} className="popup-create-cluster-button"
                                    onClick={this.createClusterClick}
                                    available={isAvailableBtnCreateCluster}/>
                        </div> : null}
                    {showCreateClusterMessage ? <div className="create-cluster-screen">
                        <p className="create-cluster-screen-title">{t.ALMOST_THERE}</p>
                        <p>{t.REDIRECT_HELP_MESSAGE}</p>
                        <p>{t.YOU_CAN_DISCONNECT}</p>

                        <Button text="Continue" onClick={this.continueClick}
                                className="create-cluster-screen-continue"
                                available={true}/>
                        <p onClick={this.cancelClick} className="create-cluster-screen-cancel">Back</p>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
