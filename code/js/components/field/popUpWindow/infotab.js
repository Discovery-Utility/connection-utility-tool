import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import mainPage_lang from "../../../locales/translation";

// The component responsible for opening pop-up windows. It contains two types of windows:
// the first for displaying information about the service;
// the second for adding the service to an existing cluster.

// Selecting a cluster in the second pop-up window
function handleClusterChange(changeEvent) {
    if (selectedCluster != "noSelected")
        document.getElementById(selectedCluster).checked = false;
    document.getElementById(changeEvent.target.value).checked = true;
    selectedCluster = changeEvent.target.value;
}

class Infotab extends React.Component {
    constructor(props) {
        super(props);

        this.filterClusterList = this.filterClusterList.bind(this);
        this.filterAllClusters = this.filterAllClusters.bind(this);
        this.countClusters = this.countClusters.bind(this);
        this.eachCluster = this.eachCluster.bind(this);
        this.clickOnJoinCluster = this.clickOnJoinCluster.bind(this);

        this.state = {
            /*array of all clusters for display in the second pop-up window*/ clustersData: this.countClusters(),
            /*array of filtered clusters*/ filterClusters: this.countClusters(),
            /*variable that the user enters, the name of the cluster to filter the list of clusters*/ name: ""
        };
    }

    // Processing of pressing the Join button in the second pop-up window.
    // Redirects by reference to the parameters of the service and the cluster
    clickOnJoinCluster() {
        var link;
        if (selectedCluster != "noSelected") {
            for (var i = 0; i < this.state.filterClusters.length; i++) {
                if (this.state.filterClusters[i].name === selectedCluster.slice(7)) {
                    link = "http://" + this.state.filterClusters[i].link;
                }
            }
            link += "/?appliances=" + selectAppliances[0];
            shell.openExternal(link);
        }
    }

    // Display each cluster "item" with index "i" in the list of clusters
    eachCluster(item, i) {
        //console.log(selectedCluster);
        return (
            <tr key={i} className="trC2">
                <td className="radioJoin">
                    <div><input type="radio" id={"cluster" + item.name} value={"cluster" + item.name}
                                onChange={handleClusterChange}/></div>
                </td>
                <td className="divForClusterImg">
                    <div><img className="clusterImg" src="icon/clusters.png"/></div>
                </td>
                <td className="clusterName">
                    <div><font> {item.name} </font></div>
                </td>
                <td className="clusterIp">
                    <div><font> {item.link.slice(0, -5)} </font></div>
                </td>
            </tr>

        );
    }

    // The function returns an array of clusters whose devices have a "cluster" == "true" field
    countClusters() {
        var clusters = [];
        if (this.props.data) {
            for (var i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].cluster === "true") {
                    var cluster = new Object();
                    cluster.link = this.props.data[i].link.slice(7);
                    cluster.name = this.props.data[i].name;
                    clusters.push(cluster);
                }
            }
        }
        return (clusters);
    }

    // Filtering all clusters by a new value
    filterAllClusters() {
        var name = this.state.name;
        if (this.state.filterClusters) {
            var filteredList = this.state.filterClusters.filter(function (item) {
                return item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        } else return null;
        // state update
        this.setState({clustersData: filteredList});
    }

    // Filtering clusters by input data
    filterClusterList(e) {
        if (selectedCluster != "noSelected") {
            document.getElementById(selectedCluster).checked = false;
            selectedCluster = "noSelected"
        }
        this.state.name = e.target.value;
        // filter by new parameters
        this.filterAllClusters();
    };

    render() {
        console.log(this.props.mode);
        // If this component has the "info" property, a page with information about the service is displayed
        if (this.props.mode === "info") {
            // If the service has a "cluster" == "false" property, then the service information page is displayed
            if (this.props.cluster == "false") {
                var ip = this.props.ip.slice(7, -5);
                return (
                    <div id="body">
                        <div id="namewin">
                            <img className="cycIcon" src="icon/cyc_icon.svg"/>
                            Cyc {this.props.type}
                            <img className="cancelIcon" src="icon/cancel.png" onClick={focusLeave}/>
                        </div>
                        <div id="block">
                            <div id="nameBlock">{mainPage_lang.Infotab_ApplDetails}</div>
                            <div id="line"></div>
                            <div id="table2">
                                <div id="collum1">
                                    <div id="tabelem">{mainPage_lang.Infotab_SN}:</div>
                                    <div id="tabelem">{mainPage_lang.Infotab_SysType}:</div>
                                    <div id="tabelem">{mainPage_lang.Infotab_IP}:</div>
                                </div>
                                <div id="collum2">
                                    <div id="tabelem">{this.props.ssn}</div>
                                    <div id="tabelem">{this.props.type}</div>
                                    <div id="tabelem">{ip}</div>
                                </div>
                            </div>
                        </div>
                        <div className="closePBC">
                            <div className="closePopupButton"
                                 onClick={focusLeave}>{mainPage_lang.Infotab_buttonClose}</div>
                        </div>
                    </div>
                );
            }
            // Otherwise, the cluster information page is displayed
            else {
                var atool = this.props.ip.slice(7);
                var ip = atool.slice(0, -5);
                return (
                    <div id="body">
                        <div id="namewin">
                            <img className="cycIcon" src="icon/cyc_icon.svg"/>
                            Cyc {this.props.type}
                            <img className="cancelIcon" src="icon/cancel.png" onClick={focusLeave}/>
                        </div>
                        <div id="block">
                            <div id="nameBlock">{mainPage_lang.Infotab_ClustDetails}</div>
                            <div id="line"></div>
                            <div id="table2">
                                <div id="collum1">
                                    <div id="tabelem">{mainPage_lang.Infotab_ClustName}:</div>
                                    <div id="tabelem">{mainPage_lang.Infotab_IP}:</div>
                                    <div id="tabelem">{mainPage_lang.Infotab_AdminTool}:</div>
                                </div>
                                <div id="collum2">
                                    <div id="tabelem">{this.props.ssn}</div>
                                    <div id="tabelem">{ip}</div>
                                    <div id="tabelem" className="atool">{atool}</div>
                                </div>
                            </div>
                        </div>
                        <div id="block">
                            <div id="nameBlock">{mainPage_lang.Infotab_ApplInCluster}</div>
                            <div id="line"></div>
                            <table>
                                <tbody>
                                <tr>
                                    <th className="thApp">{mainPage_lang.Infotab_SN}</th>
                                    <th className="thApp">{mainPage_lang.Infotab_SysType}</th>
                                    <th className="thApp">{mainPage_lang.Infotab_IP}</th>
                                </tr>
                                <tr>
                                    <td className="tdApp">X746</td>
                                    <td className="tdApp">SAN</td>
                                    <td className="tdApp">192.168.1.1</td>
                                </tr>
                                <tr>
                                    <td className="tdApp">X741</td>
                                    <td className="tdApp">SAN</td>
                                    <td className="tdApp">192.168.1.2</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="closePBC">
                            <div className="closePopupButton" onClick={focusLeave}>CLOSE</div>
                        </div>
                    </div>
                );
            }
            // Otherwise (the "mode" == "join" property), the page for adding the service to the cluster is displayed
        } else {
            var atool = this.props.ip.slice(7);
            var ip = atool.slice(0, -5);
            return (
                <div id="body">
                    <div id="namewin">
                        {mainPage_lang.Infotab_ChooseCluster}
                        <img className="cancelIcon" src="icon/cancel.png" onClick={focusLeave}/>
                    </div>
                    <div id="context">
                        {mainPage_lang.Infotab_ChooseClusterDescr}
                    </div>
                    <div id="avaliable">
                        <div id="search">
                            <div
                                id="nameBlock">{mainPage_lang.formatString(mainPage_lang.Infotab_AvailCl, this.state.filterClusters.length)}</div>
                            <div id="line"></div>
                            <input type="text" id="searchLine" style={{margin: "30px 0px"}}
                                   onChange={this.filterClusterList} placeholder={mainPage_lang.Infotab_PlaceHolder}>
                            </input>
                            <table id="clustersList">
                                <thead>
                                <tr className="trCl">
                                    <th colSpan={3} className="hCl">{mainPage_lang.Infotab_name}</th>
                                    <th className="hC2">{mainPage_lang.Infotab_IP}</th>
                                </tr>
                                </thead>
                                <tbody id="clustersContainer">
                                {this.state.clustersData.map(this.eachCluster)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="block2">
                        <div
                            id="nameBlock">{mainPage_lang.formatString(mainPage_lang.Infotab_selectedAppliances, 1)}</div>
                        <div id="line"></div>
                        <table id="selectedApplianceForJoin">
                            <tbody>
                            <tr>
                                <th className="thApp">{mainPage_lang.Infotab_SN}</th>
                                <th className="thApp">{mainPage_lang.Infotab_SysType}</th>
                                <th className="thApp">{mainPage_lang.Infotab_IP}</th>
                            </tr>
                            <tr>
                                <td className="tdApp">{this.props.ssn}</td>
                                <td className="tdApp">{this.props.type}</td>
                                <td className="tdApp">{ip}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="closePBC">
                        <div className="closePopupButton"
                             onClick={focusLeave}>{mainPage_lang.Infotab_buttonCancel}</div>
                        <div className="joinButton"
                             onClick={this.clickOnJoinCluster}>{mainPage_lang.Infotab_buttonJoin}</div>
                    </div>
                </div>
            );
        }
    }
}

export default (Infotab);
