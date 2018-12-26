import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Redirect} from "react-router-dom";
import Appliance from './../components/Appliance'
import Button from "../components/Button";
import MappleToolTip from 'reactjs-mappletooltip';


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
            redirectToSearch: false,
            stateAvailable: true,    //used for switch available/configured screen states
            showCreateClusterMessage: false,
            countConfiguredPages: 0,
            countUnconfiguredPages: 0,
            page: 0,
            showPagination: true
        };

        this.changeScreenState = () => {
            let pageState = this.state.stateAvailable;

            this.setState({
                stateAvailable: !pageState,
                selected_ids: [],
                showPagination: !pageState
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

        this.popupButtonClick = () => {
            if (this.state.stateAvailable) {
                this.setState({
                    showCreateClusterMessage: true,
                    showPagination: false
                });
            } else {
                let {selected_ids, configured} = this.state;

                let appliance = configured.filter((appliance) => {
                    return appliance.id === selected_ids[0];
                });

                let link = appliance[0].link;
                shell.openExternal(link);
            }
        };

        this.scanAgainClick = () => {
            ipcRndr.send('refresh', "Restart scaning");

            this.setState({
                redirectToSearch: true
            })
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
                showCreateClusterMessage: false,
                showPagination: true
            });
        };

        this.cancelClick = () => {
            this.setState({
                showCreateClusterMessage: false,
                showPagination: true
            });
        };

        this.pageClick = (page) => {
            this.setState({
                page: page - 1
            })
        };

        this.getCreateClusterMessage = () => {
            return (
                <div className="create-cluster-screen">
                    <p className="create-cluster-screen-title">{t.ALMOST_THERE}</p>
                    <p>{t.REDIRECT_HELP_MESSAGE}</p>
                    <p>{t.PLEASE_STAY}</p>

                    <Button text="Continue" onClick={this.continueClick}
                            className="create-cluster-screen-continue"
                            available={true}/>
                    <p onClick={this.cancelClick} className="create-cluster-screen-cancel">Back</p>
                </div>
            );
        };

        this.getPopup = (tooltipMessage, showTooltipMessage, isAvailableBtnCreateCluster, buttonText) => {
            let countSelectedAppliances = this.state.selected_ids.length;
            return (
                <div className="shadow create-cluster-popup">
                    <p className="popup-selected-text">{countSelectedAppliances} {countSelectedAppliances === 1 ? t.APPLIANCE_SELECTED : t.APPLIANCES_SELECTED}</p>
                    <div className="popup-create-cluster-button">
                        <MappleToolTip
                            showMappleIf={showTooltipMessage}
                            direction="left"
                            mappleType="contra"
                            float={false}>
                            <Button text={buttonText}
                                    onClick={this.popupButtonClick}
                                    available={isAvailableBtnCreateCluster}/>
                            <div>
                                {tooltipMessage}
                            </div>
                        </MappleToolTip>
                    </div>

                </div>
            );
        };

        this.getPagination = (pages, page) => {
            return (
                <nav className="page-selector" aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
                        {pages.map(pageId => {
                            let additionalClass = "";
                            if (pageId - 1 === page) {
                                additionalClass = "active";
                            }
                            return (<li key={pageId} className={"page-item " + additionalClass}
                                        onClick={this.pageClick.bind(this, pageId)}>
                                <a className="page-link">{pageId}</a></li>)
                        })}
                    </ul>
                </nav>
            );
        };


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
            let unconfigured = appliances.filter(appliance => appliance.state === "unconfigured");

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
        let {
            page, countConfiguredPages, countUnconfiguredPages, unconfigured, selected_ids, showCreateClusterMessage,
            configured, stateAvailable, showPagination, redirectToSearch
        } = this.state;

        let showPopup = false;
        let popupButtonText = "";
        let isAvailablePopupButton = true;
        let showTooltipMessage = false;
        let tooltipMessage = "";

        let countSelectedAppliances = selected_ids.length;

        if (countSelectedAppliances > 0) {
            showPopup = true;

            popupButtonText = stateAvailable ? t.CREATE_CLUSTER : t.GO_TO_CLUSTER;

            if (countSelectedAppliances > 1) {
                if (stateAvailable) {
                    let firstType = unconfigured.filter(appliance => appliance.id === selected_ids[0])[0].type;
                    for (let i = 1; i < countSelectedAppliances; i++) {
                        let nextType = unconfigured.filter(appliance => appliance.id === selected_ids[i])[0].type;
                        if (nextType !== firstType) {
                            isAvailablePopupButton = false;
                            showTooltipMessage = true;
                            tooltipMessage = t.MIXED_CLUSTER_WARNING;
                            break;
                        }
                    }
                } else {
                    isAvailablePopupButton = false;
                }
            }
            if (countSelectedAppliances > MAX_SELECT_APPLIANCES) {
                isAvailablePopupButton = false;
                showTooltipMessage = true;
                tooltipMessage = t.MAX_APPLIANCES_IN_CLUSTER;
            }
        }

        if (unconfigured.length > 0 && page <= countUnconfiguredPages) {
            let it1 = page * MAX_APPLIANCES_ON_PAGE;
            let it2 = it1 + MAX_APPLIANCES_ON_PAGE;
            let temp = [];
            for (; it1 < it2; it1++) {
                if (it1 >= unconfigured.length) {
                    break;
                }
                temp.push(unconfigured[it1]);
            }
            unconfigured = temp;
        }
        let pages = [];
        for (let i = 1; i <= countUnconfiguredPages; i++) {
            pages.push(i);
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

                    <div onClick={this.scanAgainClick} className="available-appliances-rescan-text">
                        {t.SCAN_AGAIN.toUpperCase()}
                    </div>

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

                    {showPagination ? this.getPagination(pages, page) : null}
                    {showPopup ? this.getPopup(tooltipMessage, showTooltipMessage, isAvailablePopupButton, popupButtonText) : null}
                    {showCreateClusterMessage ? this.getCreateClusterMessage() : null}
                    {redirectToSearch ? <Redirect to="/search"/> : null}
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
