import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import t from './../locales/translation'
import {Redirect} from "react-router-dom";
import Appliance from './../components/Appliance'
import Button from "../components/Button";
import MappleToolTip from 'reactjs-mappletooltip';
import SlideOutDialog from './../components/SlideOutDialog';


const MAX_SELECT_APPLIANCES = 4;
const MAX_APPLIANCES_ON_PAGE = 5;

const {shell} = require('electron');

/**
 * Appliance page displays available/configured appliance lists
 */
class AppliancesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appliances: [],
            configured: [],
            selected_ids: [],
            unconfigured: [],
            redirectToSearch: false,
            pageStateAvailable: true,    //used for switch available/configured screen states
            showCreateClusterMessage: false,
            countConfiguredPages: 0,
            countUnconfiguredPages: 0,
            currentPage: 0,
            showPagination: true,
            showModalAddToCluster: true
        };

        //change state from available to configured
        this.changeScreenState = () => {
            let pageState = this.state.pageStateAvailable;

            this.setState({
                pageStateAvailable: !pageState,
                selected_ids: [],
                showModalAddToCluster: !this.state.showModalAddToCluster,
                currentPage: 0
            });
        };

        //callback function for Appliance component, set selection on Appliance
        this.addSelection = (selectionId, isCheckBox) => {
            let selected = this.state.selected_ids;
            selected = isCheckBox ? selected : [];
            selected.push(selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        //remove selection from Appliance component
        this.removeSelection = (selectionId) => {
            let selected = this.state.selected_ids;
            selected = selected.filter((id) => id !== selectionId);
            this.setState({
                selected_ids: selected
            });
        };

        //click on the button in popup
        this.popupButtonClick = () => {
            if (this.state.pageStateAvailable) {
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
                ipcRndr.send("connect-to-appliance", link);
                //shell.openExternal(link);
            }
        };

        //click on the scan again link
        this.scanAgainClick = () => {
            ipcRndr.send('refresh', "Restart scaning");

            this.setState({
                redirectToSearch: true
            })
        };

        //click on continue button in CreateCluster screen
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
            ipcRndr.send("connect-to-appliance", link);
            //shell.openExternal(link);
            this.setState({
                showCreateClusterMessage: false,
                showPagination: true
            });
        };

        //click on the cancel button in CreateCluster screen
        this.cancelClick = () => {
            this.setState({
                showCreateClusterMessage: false,
                showPagination: true
            });
        };

        //click on the pagination (one of pages)
        this.pageClick = (page) => {
            this.setState({
                currentPage: page - 1
            })
        };

        //show create cluster screen
        this.getCreateClusterScreen = () => {
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

        //show popup at the bottom of the application
        this.getPopup = (tooltipMessage, showTooltipMessage, isAvailableBtnCreateCluster, buttonText) => {
            let countSelectedAppliances = this.state.selected_ids.length;
            let selectedText = "";
            if (this.state.pageStateAvailable) {
                selectedText = countSelectedAppliances + " ";
                selectedText += countSelectedAppliances === 1 ? t.APPLIANCE_SELECTED : t.APPLIANCES_SELECTED;
            } else {
                selectedText = "Cluster selected";
            }

            return (
                <div className="shadow create-cluster-popup">
                    <p className="popup-selected-text">{selectedText}</p>
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

        //show pagination
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

        //show modal Add To Cluster
        this.getModal = () => {

            let selectedAppliance = this.state.unconfigured.filter(appliance => appliance.id === this.state.selected_ids[0])[0];
            let configuredAppliances = this.state.configured.filter(appliance => appliance.type === selectedAppliance.type);
            return (
                <SlideOutDialog
                    configured={configuredAppliances}
                    selectedAppliance={selectedAppliance}
                />
            );
        };
    }

    componentDidMount() {
        //parse data from backend
        let appliances = JSON.parse(localStorage.getItem("message")).storages;

        if (appliances) {

            //set ids to appliances
            for (let i = 0; i < appliances.length; i++) {
                appliances[i].id = i;
            }

            //filter appliances to configured and unconfigured
            let configured = appliances.filter(appliance => appliance.state === "configured" || appliance.state === "service state");
            let unconfigured = appliances.filter(appliance => appliance.state === "unconfigured");

            //count pages in pagination
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
            currentPage, countConfiguredPages, countUnconfiguredPages, unconfigured, selected_ids, showCreateClusterMessage,
            configured, pageStateAvailable, showPagination, redirectToSearch, showModalAddToCluster
        } = this.state;

        let showPopup = false;
        let popupButtonText = "";
        let isAvailablePopupButton = true;
        let showTooltipMessage = false;
        let tooltipMessage = "";
        let showSettingsInAppliance = false;
        let countSelectedAppliances = selected_ids.length;

        let appliances = pageStateAvailable ? unconfigured : configured;
        let countPages = pageStateAvailable ? countUnconfiguredPages : countConfiguredPages;


        showPagination = showPagination && appliances.length > MAX_APPLIANCES_ON_PAGE;
        showModalAddToCluster = showModalAddToCluster && selected_ids.length === 1;

        //show popup at the bottom of the page
        if (countSelectedAppliances > 0) {
            showPopup = true;

            popupButtonText = pageStateAvailable ? t.CREATE_CLUSTER : t.GO_TO_CLUSTER;

            if (countSelectedAppliances > 1) {
                if (pageStateAvailable) {
                    let firstType = unconfigured.filter(appliance => appliance.id === selected_ids[0])[0].type;

                    //check that appliances have same types
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

            //check that selected appliances less than max select appliances
            if (countSelectedAppliances > MAX_SELECT_APPLIANCES) {
                isAvailablePopupButton = false;
                showTooltipMessage = true;
                tooltipMessage = t.MAX_APPLIANCES_IN_CLUSTER;
            }
        }

        //prepare appliances that displays at one page
        if (appliances.length > 0 && currentPage <= countPages) {
            let it1 = currentPage * MAX_APPLIANCES_ON_PAGE;
            let it2 = it1 + MAX_APPLIANCES_ON_PAGE;
            let temp = [];
            for (; it1 < it2; it1++) {
                if (it1 >= appliances.length) {
                    break;
                }
                temp.push(appliances[it1]);
            }
            appliances = temp;
        }

        //prepare pages
        let pages = [];
        for (let i = 1; i <= countPages; i++) {
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
                        <p className="change-available-configured">{pageStateAvailable ? t.AVAILABLE : t.CONFIGURED}</p>
                        <label className="switch">
                            <input onClick={this.changeScreenState} type="checkbox"/>
                            <span className="slider round"/>
                        </label>
                    </div>

                    <div className="row">
                        {this.state.pageStateAvailable && <p>{t.SELECT_APPLIANCES}</p>}
                    </div>

                    <div className="row">
                        <div className="appliances-list">
                            {
                                appliances.map(appliance => {
                                    let active = false;

                                    selected_ids.forEach((element) => {
                                        showSettingsInAppliance = false;
                                        if (element === appliance.id) {
                                            showSettingsInAppliance = pageStateAvailable && selected_ids.length === 1;
                                            active = true;
                                        }
                                    });
                                    let isSelectTypeCheckbox = pageStateAvailable;

                                    return (
                                        <Appliance key={appliance.id}
                                                   addSelection={this.addSelection}
                                                   removeSelection={this.removeSelection}
                                                   appliance={appliance}
                                                   selectTypeCheckbox={isSelectTypeCheckbox}
                                                   showSettingsMenu={showSettingsInAppliance}
                                                   active={active}/>
                                    );
                                })}
                        </div>
                    </div>
                    {showModalAddToCluster && this.getModal()}
                    {showPagination && this.getPagination(pages, currentPage)}
                    {showPopup && this.getPopup(tooltipMessage, showTooltipMessage, isAvailablePopupButton, popupButtonText)}
                    {showCreateClusterMessage && this.getCreateClusterScreen()}
                    {redirectToSearch && <Redirect to="/search"/>}
                </div>
            </div>
        )
    }
}

export default AppliancesPage;
