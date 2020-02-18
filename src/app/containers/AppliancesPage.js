import React, {Component} from "react";
import AppHeader from "../components/AppHeader";
import t from "./../locales/translation";
import {Redirect} from "react-router-dom";
import Appliance from "./../components/Appliance";
import Button from "../components/Button";
import MappleToolTip from "reactjs-mappletooltip";
import SlideOutDialog from "./../components/SlideOutDialog";

const MAX_SELECT_APPLIANCES = 4;
const MAX_APPLIANCES_ON_PAGE = 5;

const {shell} = require("electron");

/**
 * Appliance page displays unconfigured/configured appliance lists
 */
class AppliancesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appliances: [],
            configured: [],
            selectedNames: [],
            unconfigured: [],
            redirectToSearch: false,
            pageStateUnconfigured: true, //used for switch unconfigured/configured screen states
            showPageStateButton: true,
            showCreateClusterMessage: false,
            countConfiguredPages: 0,
            countUnconfiguredPages: 0,
            currentPage: 0,
            showPagination: true,
            showModalAddToCluster: true
        };

        //change state from configured to unconfigured
        this.changePageStateToUnconfigured = () => {
            // update states only in case of changing page
            if (!this.state.pageStateUnconfigured) {
                this.setState({
                    pageStateUnconfigured: true,
                    selectedNames: [],
                    showModalAddToCluster: !this.state.showModalAddToCluster,
                    currentPage: 0
                });
            }
        };

        //change state from unconfigured to configured
        this.changePageStateToConfigured = () => {
            if (this.state.pageStateUnconfigured) {
                this.setState({
                    pageStateUnconfigured: false,
                    selectedNames: [],
                    showModalAddToCluster: !this.state.showModalAddToCluster,
                    currentPage: 0
                });
            }
        };

        //callback function for Appliance component, set selection on Appliance
        this.addSelection = (selectionName, isCheckBox) => {
            let selected = this.state.selectedNames;
            selected = isCheckBox ? selected : [];
            selected.push(selectionName);
            this.setState({
                selectedNames: selected
            });
        };

        //remove selection from Appliance component
        this.removeSelection = (selectionName) => {
            let selected = this.state.selectedNames;
            selected = selected.filter(name => name !== selectionName);
            this.setState({
                selectedNames: selected
            });
        };

        //click on the button in popup
        this.popupButtonClick = () => {
            if (this.state.pageStateUnconfigured) {
                this.setState({
                    showCreateClusterMessage: true,
                    showPagination: false,
                    showPageStateButton: false
                });
            } else {
                let {selectedNames, configured} = this.state;

                let appliance = configured.filter(appliance => appliance.name === selectedNames[0]);

                let link = appliance[0].link;
                ipcRndr.send("connect-to-appliance", link);
                //shell.openExternal(link);
            }
        };

        //click on the scan again link
        this.scanAgainClick = () => {
            ipcRndr.send("refresh", "Restart scaning");

            this.setState({
                redirectToSearch: true
            });
        };

        //click on continue button in CreateCluster screen
        this.continueClick = () => {
            let {selectedNames, unconfigured} = this.state;

            let countSelected = selectedNames.length;
            let firstAppliance = unconfigured.filter(appliance => appliance.name === selectedNames[0]);

            let names = "";
            for (let i = 0; i < countSelected; i++) {
                let nextAppliance = unconfigured.filter(appliance => appliance.name === selectedNames[i]);

                names += nextAppliance[0].name;
                names += i < countSelected - 1 ? "," : "";
            }
            let link = firstAppliance[0].link + "/?appliances=" + names;
            ipcRndr.send("connect-to-appliance", link);
            //shell.openExternal(link);
            this.setState({
                showCreateClusterMessage: false,
                showPagination: true,
                showPageStateButton: true
            });
        };

        //click on the cancel button in CreateCluster screen
        this.cancelClick = () => {
            this.setState({
                showCreateClusterMessage: false,
                showPagination: true,
                showPageStateButton: true
            });
        };

        //click on the pagination (one of pages)
        this.pageClick = page => {
            this.setState({
                currentPage: page - 1
            });
        };

        //show create cluster screen
        this.getCreateClusterScreen = () => {
            return (
                <div className="create-cluster-screen text-center">
                    <p className="create-cluster-screen-title">{t.ALMOST_THERE}</p>
                    <p>{t.REDIRECT_HELP_MESSAGE}</p>
                    <p>{t.PLEASE_STAY}</p>

                    <Button text="Continue" onClick={this.continueClick} className="create-cluster-screen-continue" available={true} />
                    <p onClick={this.cancelClick} className="create-cluster-screen-cancel">
                        Back
                    </p>
                </div>
            );
        };

        //show popup at the bottom of the application
        this.getPopup = (tooltipMessage, showTooltipMessage, isAvailableBtnCreateCluster, buttonText) => {
            let countSelectedAppliances = this.state.selectedNames.length;
            let selectedText = "";
            if (this.state.pageStateUnconfigured) {
                selectedText = countSelectedAppliances + " ";
                selectedText += countSelectedAppliances === 1 ? t.APPLIANCE_SELECTED : t.APPLIANCES_SELECTED;
            } else {
                selectedText = "Cluster selected";
            }

            return (
                <div className="shadow create-cluster-popup">
                    <p className="popup-selected-text">{selectedText}</p>
                    <div className="popup-create-cluster-button">
                        <MappleToolTip showMappleIf={showTooltipMessage} direction="left" mappleType="contra" float={false}>
                            <Button text={buttonText} onClick={this.popupButtonClick} available={isAvailableBtnCreateCluster} />
                            <div>{tooltipMessage}</div>
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
                            return (
                                <li key={pageId} className={"page-item " + additionalClass} onClick={this.pageClick.bind(this, pageId)}>
                                    <a className="page-link">{pageId}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            );
        };

        this.getScreenStateButton = () => {
            return (
                <ul className="pagination justify-content-start change-unconfigured-configured">
                    <li
                        className={`page-item ${this.state.pageStateUnconfigured ? "active" : ""}`}
                        onClick={this.changePageStateToUnconfigured}
                    >
                        <a className="page-link">{t.UNCONFIGURED}</a>
                    </li>
                    <li
                        className={`page-item ${this.state.pageStateUnconfigured ? "" : "active"}`}
                        onClick={this.changePageStateToConfigured}
                    >
                        <a className="page-link">{t.CONFIGURED}</a>
                    </li>
                </ul>
            );
        };

        //show modal Add To Cluster
        this.getModal = () => {
            let selectedAppliance = this.state.unconfigured.find(appliance => appliance.name === this.state.selectedNames[0]);
            let configuredAppliances = this.state.configured.filter(appliance => appliance.type === selectedAppliance.type);
            return <SlideOutDialog configured={configuredAppliances} selectedAppliance={selectedAppliance} />;
        };
    }

    componentDidMount() {
        this.getApplianceList();

        ipcRndr.on('update-appliance-list', (event, message, newApplianceName) => {
            if (message === 'delete') {
                let unselectedAppliance = this.state.appliances.filter(appliance => appliance.name === newApplianceName);
                unselectedAppliance.forEach(appliance => this.removeSelection(appliance.name));
            }
            this.getApplianceList();
        });
    }

    componentWillUnmount() {
        ipcRndr.removeAllListeners('update-appliance-list');
    }

    getApplianceList() {
        //parse data from backend
        let appliances = JSON.parse(localStorage.getItem("message")).storages;

        if (appliances) {
            //filter appliances to configured and unconfigured
            let configured = appliances.filter(appliance => appliance.cluster === "true");
            let unconfigured = appliances.filter(appliance => appliance.cluster === "false");

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
            currentPage,
            countConfiguredPages,
            countUnconfiguredPages,
            unconfigured,
            selectedNames,
            showCreateClusterMessage,
            configured,
            pageStateUnconfigured,
            showPageStateButton,
            showPagination,
            redirectToSearch,
            showModalAddToCluster
        } = this.state;

        let showPopup = false;
        let popupButtonText = "";
        let isAvailablePopupButton = true;
        let showTooltipMessage = false;
        let tooltipMessage = "";
        let showSettingsInAppliance = false;
        let countSelectedAppliances = selectedNames.length;

        let appliances = pageStateUnconfigured ? unconfigured : configured;
        let countPages = pageStateUnconfigured ? countUnconfiguredPages : countConfiguredPages;

        showPagination = showPagination && appliances.length > MAX_APPLIANCES_ON_PAGE;
        showModalAddToCluster = showModalAddToCluster && selectedNames.length === 1;

        //show popup at the bottom of the page
        if (countSelectedAppliances > 0) {
            showPopup = true;

            popupButtonText = pageStateUnconfigured ? t.CREATE_CLUSTER : t.GO_TO_CLUSTER;

            if (countSelectedAppliances > 1) {
                if (pageStateUnconfigured) {
                    let firstType = unconfigured.find(appliance => appliance.name === selectedNames[0]).type;

                    //check that appliances have same types and that they are not HCI
                    for (let i = 1; i < countSelectedAppliances; i++) {
                        let nextType = unconfigured.find(appliance => appliance.name === selectedNames[i]).type;

                        if (nextType !== firstType) {
                            isAvailablePopupButton = false;
                            showTooltipMessage = true;
                            tooltipMessage = t.MIXED_CLUSTER_WARNING;
                            break;
                        }
                        if (nextType === "HCI") {
                            isAvailablePopupButton = false;
                            showTooltipMessage = true;
                            tooltipMessage = t.MULTI_HCI_CLUSTER_WARNING;
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
                <AppHeader />
                <div className="appliances-header">
                    <div className="available-appliances-title">{t.APPLIANCES}</div>

                    <div className="available-appliances-rescan">
                        <img src="./images/refresh.svg" width="20" height="20" alt="refresh-ico" />
                    </div>

                    <div onClick={this.scanAgainClick} className="available-appliances-rescan-text">
                        {t.SCAN_AGAIN.toUpperCase()}
                    </div>
                </div>

                <div className="container">
                    <div className="row">{showPageStateButton && this.getScreenStateButton()}</div>

                    <div className="row">{this.state.pageStateUnconfigured && <p>{t.SELECT_APPLIANCES}</p>}</div>

                    <div className="row">
                        <div className="appliances-list">
                            {
                                appliances.map(appliance => {
                                    let active = false;

                                    selectedNames.forEach((element) => {
                                        showSettingsInAppliance = false;
                                        if (element === appliance.name) {
                                            showSettingsInAppliance = pageStateUnconfigured && selectedNames.length === 1;
                                            active = true;
                                        }
                                    });
                                    let isSelectTypeCheckbox = pageStateUnconfigured;

                                    return (
                                        <Appliance key={appliance.name}
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
                    {redirectToSearch && <Redirect to="/search" />}
                </div>
            </div>
        );
    }
}

export default AppliancesPage;
