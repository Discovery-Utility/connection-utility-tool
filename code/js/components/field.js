import React from 'react';
import ReactDOM from "react-dom";
import Appliance from "./field/appliance";
import Infotab from "./field/popUpWindow/infotab"
import ClusterTooltip from "./field/clusterTooltip";
import JoinClusterTooltip from "./field/joinClusterTooltip";
import LoadTooltip from "./field/pageForTooltip";
import 'bootstrap/dist/css/bootstrap.css';
import mainPage_lang from "../locales/translation";

// Html-element, in which this component will be displayed
var timerForTooltip = 0;

// message from "localStorage"
var mess = null;
// appliances' info
var data = [];
var tempSize = 0;

// This component is responsible for displaying the entire application and
// contains a header, the display area of all devices
class Field extends React.Component {

    // The device information is passed from the main.js part to this component
    // through the local application store (a.k. as "localStorage")

    constructor(props) {
        super(props);

        this.state = {

            /*the main array of detected services*/  appliances: data,
            /*service name*/ name: "",
            /*service type*/ type: "",
            /*service state*/ state: prevFilter,
            /*number of unconfigured services*/ unconfig: this.calcOfCriteria("unconfigured"),
            /*number of configured services*/ config: this.calcOfCriteria("configured"),
            /*number of unconfigured services on technical service*/ service: this.calcOfCriteria("service state"),
            /*total number of services*/ all: this.calcOfCriteria("all"),

            // takes true when switching filters, allows you to leave an empty field instead of appliances area,
            // and also allows the main display area of the appliances to flicker
            filterPosition: false
        };

        this.filterList = this.filterList.bind(this);
        this.filterType = this.filterType.bind(this);
        this.filterConfiguration = this.filterConfiguration.bind(this);
        this.createClick = this.createClick.bind(this);
        this.calcOfCriteria = this.calcOfCriteria.bind(this);
        this.selectMainFilters = this.selectMainFilters.bind(this);
        this.selectSecondFilters = this.selectSecondFilters.bind(this);
        this.lightButtonCreate = this.lightButtonCreate.bind(this);
        this.mouseEventOnCreateClick = this.mouseEventOnCreateClick.bind(this);
        this.mouseleaveFromCreateClick = this.mouseleaveFromCreateClick.bind(this);
        this.lightUnconfigured = this.lightUnconfigured.bind(this);
        this.joinClick = this.joinClick.bind(this);
        this.mouseEventOnJoinClick = this.mouseEventOnJoinClick.bind(this);
        this.mouseleaveFromJoinClick = this.mouseleaveFromJoinClick.bind(this);
        this.lightButtonJoin = this.lightButtonJoin.bind(this);
        this.refreshButton = this.refreshButton.bind(this);
    };

    // Restart service browsing
    refreshButton() {
        ipcRndr.send('refresh', "Restart scaning");
    }

    // Counting services for each filter
    calcOfCriteria(crit) {
        var mainFilt = 0;
        var secFilt = 0;
        if (data != null) {
            if (crit === 'all') {
                mainFilt = data.length;
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].state === crit) {
                        mainFilt++;

                    }
                }
            }
        }
        return mainFilt;
    }

    // Processing of Join click, opening a pop-up window for adding a service to the cluster
    joinClick() {
        if (selectAppliances.length == 1) {
            var cluster, ip, ssn, state, type;
            var ppup = document.getElementById("joinpopup");
            ppup.style.transitionDuration = "0.3s";
            ppup.style.left = "60%";
            ppup.style.visibility = "visible";
            ppup.style.opacity = "1.0";
            for (var i = 0; i < data.length; i++) {
                if (data[i].name === selectAppliances[0]) {
                    cluster = data[i].cluster;
                    ip = data[i].link;
                    ssn = data[i].name;
                    state = data[i].state;
                    type = data[i].type;
                }
            }
            ReactDOM.render(
                <Infotab
                    cluster={cluster}
                    ip={ip}
                    ssn={ssn}
                    state={state}
                    type={type}
                    mode="join"
                    data={data}
                />,
                document.getElementById("joinpopup")
            );
        }
    }

    // Handling the hover on the Join button
    mouseEventOnJoinClick() {
        if (selectAppliances.length == 1) {
            this.state.buttonJoin = true;
            var st = document.getElementById("buttonJoin").style;
            st.color = "white";
            st.backgroundColor = "#248dc0";
        } else if (selectAppliances.length > 1) {
            document.getElementById("tooltiptextJoinCluster").style.visibility = "visible";
        }
    }

    // Handling the focus left on the Join button
    mouseleaveFromJoinClick() {
        if (selectAppliances.length == 1) {
            this.state.buttonJoin = false;
            document.getElementById("buttonJoin").style.cssText = "";
        } else if (selectAppliances.length > 1) {
            document.getElementById("tooltiptextJoinCluster").style.visibility = "hidden";
        }
    }

    // highlighting of the Join button
    // If only 1 appliance is selected, the button is active
    lightButtonJoin() {
        var st = document.getElementById("buttonJoin").style;
        if (selectAppliances.length == 1) {
            st.borderColor = "#248dc0";
            if (!this.state.buttonJoin) st.color = "#248dc0";
        } else {
            st.color = "#c4c4c4";
            st.borderColor = "#c4c4c4";
            st.backgroundColor = "#ffffff";
        }
    }

    // Processing of pressing the Create button opens a link with the parameters of the selected services
    createClick() {
        if (selectAppliances.length > 0 && selectAppliances.length <= 4) {
            var ssns = "";
            var ipSSN = "";
            for (var i = 0; i < selectAppliances.length; i++) {
                if (i === 0) {
                    for (var j = 0; j < data.length; j++) {
                        if (selectAppliances[0] === data[j].name) {
                            ipSSN = data[j].link;
                        }
                    }
                }
                if (i < selectAppliances.length - 1) ssns += selectAppliances[i] + ",";
                else ssns += selectAppliances[i];
            }
            var link = ipSSN + "/?appliances=" + ssns;
            shell.openExternal(link);
            this.state.buttonCreate = false;
            selectAppliances = [];
            this.state.filterPosition = true;
        }
    }

    // Switching and highlighting of main filters
    selectMainFilters() {
        var allFilters = document.getElementsByClassName("confFilt");
        for (var i = 0; i < allFilters.length; i++) {
            allFilters[i].style.cssText = "";
        }
        var filter = this.state.state;
        if (filter === "") filter = "all";
        var st = document.getElementById(filter).style;
        st.borderBottom = "2px solid #2790c3";
        st.color = "#248dc0";
    }

    // Switching and highlighting of secondary filters: "SAN", "VMware", "All"
    selectSecondFilters() {
        var allFilters = document.getElementsByClassName("typeFilt");
        for (var i = 0; i < allFilters.length; i++) {
            allFilters[i].style.cssText = "";
        }
        var filter = this.state.type;
        if (filter === "") filter = "allSecondFilters";
        var st = document.getElementById(filter).style;
        st.color = "white";
        st.backgroundColor = "#248dc0";
    }

    // Highlighting of the Create button
    // If you select from 1 to 4 appliances, the button is highlighted
    lightButtonCreate() {
        var st = document.getElementById("buttonCreate").style;
        if (selectAppliances.length !== 0 && selectAppliances.length <= 4) {
            st.borderColor = "#248dc0";
            if (!this.state.buttonCreate) st.color = "#248dc0";
        } else {
            st.color = "#c4c4c4";
            st.borderColor = "#c4c4c4";
            st.backgroundColor = "#ffffff";
        }
    }

    // Handling the Create button hover
    mouseEventOnCreateClick() {
        if (selectAppliances.length !== 0 && selectAppliances.length <= 4) {
            this.state.buttonCreate = true;
            var st = document.getElementById("buttonCreate").style;
            st.color = "white";
            st.backgroundColor = "#248dc0";
        } else if (selectAppliances.length > 4) {
            document.getElementById("tooltiptextCluster").style.visibility = "visible";
        }
    }

    // Handling the Create button focus left
    mouseleaveFromCreateClick() {
        if (selectAppliances.length !== 0 && selectAppliances.length <= 4) {
            this.state.buttonCreate = false;
            document.getElementById("buttonCreate").style.cssText = "";
        } else if (selectAppliances.length > 4) {
            document.getElementById("tooltiptextCluster").style.visibility = "hidden";
        }
    }

    // Special spelling of the unconfigured state in the appliance
    lightUnconfigured() {
        var st = document.getElementsByClassName("unconfiguredunc");
        for (var i = 0; i < st.length; i++) {
            st[i].style.fontStyle = "italic";
            st[i].style.fontSize = "11px";
            st[i].style.color = "#939393";
        }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            100
        );
    };

    componentWillUnmount() {
        clearInterval(this.timerId);
    };

    // Timer for updating the data displaying in the UI
    tick() {
        mess = localStorage.getItem('message');
        data = JSON.parse(mess);
        if (data == null) {
            data = [];
        }
        if (data.length != 0) {
            data = data.storages;
        }

        if (data.length != tempSize) {
            tempSize = data.length;
            timerForTooltip = 0;
        }
        if (data.length == 0) {
            data = [];
            if (timerForTooltip < 100) {
                timerForTooltip++;
            } else {
                document.getElementById("tooltiptext").style.visibility = "visible";
            }
        }


        this.setState({appliances: data});
        if (data.length != 0) {
            this.setState({
                unconfig: this.calcOfCriteria("unconfigured"),
                config: this.calcOfCriteria("configured"),
                service: this.calcOfCriteria("service state"),
                all: this.calcOfCriteria("all")
            });
            // Highlighting createButton
            this.lightButtonCreate();
            this.lightButtonJoin();
            // Setting the filter highlighting
            this.selectMainFilters();
            this.selectSecondFilters();
            this.filterAll();
            // Special highlighting of the string "unconfigured"
            this.lightUnconfigured();
        }
    };

    // Display function of each device "item" with the index "i" in the list of devices
    eachAppliance(item, i) {
        return (
            <Appliance index={i} key={i}
                       ssn={item.name} type={item.type} ip={item.link} state={item.state} cluster={item.cluster}/>
        );
    };

    // Filtering the list of devices found on the network
    filterList(e) {
        selectAppliances = [];
        this.state.filterPosition = true;
        console.log("Filter by name:" + e.target.value)
        this.state.name = e.target.value;
        // filter by new parameters
        this.filterAll();
    };

    // Filtering the devices' list by their type: {VMware, SAN}
    filterType(type) {
        selectAppliances = [];
        this.state.type = type;
        this.selectSecondFilters();
        this.state.filterPosition = true;
        this.filterAll();
    };

    // Filtering the devices' list by their state: {All, Configured, Unconfigured, Service state}
    filterConfiguration(config) {
        selectAppliances = [];
        this.state.state = config;
        prevFilter = config;
        this.selectMainFilters();
        this.state.filterPosition = true;
        this.filterAll();
    };

    // Filtering the devices' list by new parametres from secondary filters
    filterAll() {
        var name = this.state.name;
        var type = this.state.type;
        var state = this.state.state;
        if (this.state.appliances) {
            var filteredList = this.state.appliances.filter(function (item) {
                return item.state.toLowerCase().indexOf(state.toLowerCase()) !== -1 &&
                    item.state.toLowerCase().indexOf(state.toLowerCase()) !== 2 &&
                    item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1 &&
                    item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        } else return null;
        // state update
        this.setState({appliances: filteredList});
    };

    render() {
        // If there are services and their number is not equal to zero, and also
        // there is no switching of filters ("filterPosition"), the page with appliances is displayed
        if (this.state.appliances != null && this.state.appliances.length != 0 && !this.state.filterPosition) {
            return (
                <div>
                    {/* Header */}
                    <div id="innerHeader">

                        <div id="ApplianceSign">
                            <font>{mainPage_lang.APPLIANCES}</font>
                        </div>
                        <div id="configFilters">
                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "")} id="all">
                                <font>{mainPage_lang.formatString(mainPage_lang.ALL_APPLIANCES_FILTER, this.state.all)}</font>
                            </div>
                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "unconfigured")}
                                 id="unconfigured">
                                <font>{mainPage_lang.formatString(mainPage_lang.UNCONFIGURED_FILTER, this.state.unconfig)}</font>
                            </div>

                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "configured")}
                                 id="configured">
                                <font>{mainPage_lang.formatString(mainPage_lang.CONFIGURED_FILTER, this.state.config)}</font>
                            </div>

                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "service state")}
                                 id="service state">
                                <font>{mainPage_lang.formatString(mainPage_lang.SERVICE_STATE_FILTER, this.state.service)}</font>
                            </div>

                            <div id="confFiltUnderline"/>
                        </div>

                    </div>

                    <div id="representation">
                        <div id="reprHeader">
                            <div className="gridForHead row">

                                <div id="search" className="col-lg-5 col-md-8 col-sm-7">
                                    <input type="text" id="searchLine" onChange={this.filterList}
                                           placeholder={mainPage_lang.SEARCH_APPLIANCES}>
                                    </input>
                                </div>

                                <div className="col-lg-2 col-md-4 col-sm-5">
                                    <div id="typeFilters">
                                        <div className="typeFilt" onClick={this.filterType.bind(this, "")}
                                             id="allSecondFilters">
                                            <font>{mainPage_lang.ALL}</font>
                                        </div>

                                        <div className="typeFilt typeFiltMiddle"
                                             onClick={this.filterType.bind(this, "SAN")} id="SAN">
                                            <font>SAN</font>
                                        </div>

                                        <div className="typeFilt" onClick={this.filterType.bind(this, "VMware")}
                                             id="VMware">
                                            <font>ESXi</font>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-md-5 col-sm-5">
                                    <div id="tooltipCluster">
                                        <div id="buttonCreate" onClick={this.createClick}
                                             onMouseEnter={this.mouseEventOnCreateClick}
                                             onMouseLeave={this.mouseleaveFromCreateClick}>
                                            <font>{mainPage_lang.CREATE_CLUSTER}</font>
                                        </div>
                                        <div id="tooltiptextCluster">
                                            <ClusterTooltip/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-md-5 col-sm-5">
                                    <div id="tooltipJoinCluster">
                                        <div id="buttonJoin" onClick={this.joinClick}
                                             onMouseEnter={this.mouseEventOnJoinClick}
                                             onMouseLeave={this.mouseleaveFromJoinClick}>
                                            <font>{mainPage_lang.JOIN_CLASTER}</font>
                                        </div>
                                        <div id="tooltiptextJoinCluster">
                                            <JoinClusterTooltip/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-1 col-md-2 col-sm-2">
                                    <div id="buttonRenew" onClick={this.refreshButton}>
                                        <img src="icon/refresh.svg" height="25"/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Grid */}
                        <div className="gridContainer">
                            <div className="container-fluid">
                                <div className="row justify-content-start">
                                    {this.state.appliances.map(this.eachAppliance)}
                                </div>
                            </div>
                        </div>
                        <div>{mainPage_lang.formatString(mainPage_lang.FILTER_APPLIANCES_SELECTED, selectAppliances.length)}</div>
                    </div>

                </div>
            );

            // If there is a switch of filters, but the services still exist, there is
            // a blank page the size of the main page with appliances so that
            // the main page does not flicker when switching filters
        } else if (this.state.filterPosition || data.length != 0) {
            this.state.filterPosition = false;
            return (
                <div>
                    {/* Header */}

                    <div id="innerHeader">

                        <div id="ApplianceSign">
                            <font>{mainPage_lang.APPLIANCES}</font>
                        </div>

                        <div id="configFilters">
                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "")} id="all">
                                <font>{mainPage_lang.formatString(mainPage_lang.ALL_APPLIANCES_FILTER, this.state.all)}</font>
                            </div>
                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "unconfigured")}
                                 id="unconfigured">
                                <font>{mainPage_lang.formatString(mainPage_lang.UNCONFIGURED_FILTER, this.state.unconfig)}</font>
                            </div>

                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "configured")}
                                 id="configured">
                                <font>{mainPage_lang.formatString(mainPage_lang.CONFIGURED_FILTER, this.state.config)}</font>
                            </div>

                            <div className="confFilt" onClick={this.filterConfiguration.bind(this, "service state")}
                                 id="service state">
                                <font>{mainPage_lang.formatString(mainPage_lang.SERVICE_STATE_FILTER, this.state.service)}</font>
                            </div>
                            <div id="confFiltUnderline"/>
                        </div>

                    </div>

                    <div id="representation">
                        <div id="reprHeader">
                            <div id="search">
                                <input type="text" id="searchLine" onChange={this.filterList}
                                       placeholder={mainPage_lang.SEARCH_APPLIANCES}>
                                </input>
                            </div>

                            <div id="typeFilters">
                                <div className="typeFilt" onClick={this.filterType.bind(this, "")}
                                     id="allSecondFilters">
                                    <font>{mainPage_lang.ALL}</font>
                                </div>

                                <div className="typeFilt typeFiltMiddle" onClick={this.filterType.bind(this, "SAN")}
                                     id="SAN">
                                    <font>SAN</font>
                                </div>

                                <div className="typeFilt" onClick={this.filterType.bind(this, "VMware")} id="VMware">
                                    <font>ESXi</font>
                                </div>
                            </div>

                            <div id="buttonCreate" onClick={this.createClick}
                                 onMouseEnter={this.mouseEventOnCreateClick}
                                 onMouseLeave={this.mouseleaveFromCreateClick}>
                                <font>{mainPage_lang.CREATE_CLUSTER}</font>
                            </div>
                            <div id="buttonJoin" onClick={this.joinClick} onMouseEnter={this.mouseEventOnJoinClick}
                                 onMouseLeave={this.mouseleaveFromJoinClick}>
                                <font>{mainPage_lang.JOIN_CLASTER}</font>
                            </div>

                            <div id="buttonRenew" onClick={this.refreshButton}>
                                <img src="icon/refresh.svg" height="25"/>
                            </div>
                        </div>
                        <div className="gridContainer">
                            <div className="container-fluid">
                                <div className="row justify-content-start"></div>
                            </div>
                        </div>
                    </div>

                </div>
            );
            // Otherwise, the download page is displayed
        } else {
            return (
                <div>
                    {/* Header */}
                    <div id="innerHeader">
                        <div id="ApplianceSign">
                            <font>{mainPage_lang.APPLIANCES}</font>
                        </div>
                    </div>
                    <div id="representation">
                        <div className="loading">
                            <div id="loadPic">
                                <div id="tooltip">
                                    <div className="loadGif"></div>
                                    <div id="tooltiptext">
                                        <LoadTooltip/>
                                    </div>
                                </div>
                            </div>
                            <div id="searchText">
                                <font>{mainPage_lang.SEARCHING}</font>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    };
};
// Ability to use the component by other files
export default (Field);
