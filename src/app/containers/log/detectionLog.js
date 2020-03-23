import React from "react";
import mainPage_lang from "../../locales/translation";
import AppHeader from "../../components/AppHeader";
import App from "../App";
import Button from "./../../components/Button";

class DetectionLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detLogs: JSON.parse(localStorage.getItem("logs")),
            eventLogs: JSON.parse(localStorage.getItem("eventlogs")),
            subtab: "detectionLog"
        };
        // this.state = JSON.parse(localStorage.getItem('logs'));
        this.changeSubtabs = this.changeSubtabs.bind(this);
        this.returnTabs = this.returnTabs.bind(this);
        this.eachLog = this.eachLog.bind(this);
        this.refreshLogs = this.refreshLogs.bind(this);
        this.saveLogs = this.saveLogs.bind(this);
        this.clearLogs = this.clearLogs.bind(this);
    }

    refreshLogs() {
        this.setState({
            detLogs: JSON.parse(localStorage.getItem("logs")),
            eventLogs: JSON.parse(localStorage.getItem("eventlogs"))
        });
    }

    changeSubtabs(subtab) {
        this.setState({
            subtab: subtab
        });
        let subtabs = document.getElementsByClassName("subtabs");
        for (let i = 0; i < subtabs.length; i++) {
            subtabs[i].style.color = "#555555";
            subtabs[i].style.backgroundColor = "white";
        }
        let selectSubtub = document.getElementById(subtab).style;
        selectSubtub.color = "#248dc0";
        selectSubtub.backgroundColor = "#eeeeee";
    }

    // Cleare detection logs
    clearLogs() {
        const tmp = {
            storages: []
        };
        var logs = JSON.stringify(tmp, "", 4);
        localStorage.setItem("logs", logs);
        ipcRndr.send("clearDetectLog", "Clear logs");
        this.refreshLogs();
    }

    // Save detection logs
    saveLogs(text, name, type) {
        const logStor = this.state.detLogs.storages;
        text = "";
        for (let i = 0; i < logStor.length; i++) {
            text +=
                logStor[i].date +
                " " +
                logStor[i].status +
                ":" +
                logStor[i].name +
                "._" +
                logStor[i].type +
                "._" +
                logStor[i].state +
                "._" +
                logStor[i].cluster +
                " " +
                logStor[i].link.slice(7) +
                "\n";
        }
        const logFile = new Blob([text], {type: type});
        const url = URL.createObjectURL(logFile);
        let a = document.createElement("a");
        console.log(url);
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    returnTabs() {
        return (
            <div id="logSwitch">
                <div id="systemLogs">{mainPage_lang.LOGS_SYSTEM_LOGS}</div>
                <div className="subtabs detectionLog" id="detectionLog" onClick={this.changeSubtabs.bind(this, "detectionLog")}>
                    {mainPage_lang.LOGS_DETECTION_LOG}
                </div>
                <div className="subtabs eventLog" id="eventLog" onClick={this.changeSubtabs.bind(this, "eventLog")}>
                    {mainPage_lang.LOGS_EVENT_LOG}
                </div>
            </div>
        );
    }

    eachLog(item, i) {
        return (
            <tr key={i}>
                <td>
                    <div>
                        <font> {item.name + " " + item.status} </font>
                    </div>
                </td>
                <td>
                    <div>
                        <font> {item.link.slice(7)} </font>
                    </div>
                </td>
                <td>
                    <div>
                        <font> {item.state} </font>
                    </div>
                </td>
                <td>
                    <div>
                        <font> {item.type === "HCI" ? "X" : "T"} </font>
                    </div>
                </td>
                <td>
                    <div>
                        <font> {item.date} </font>
                    </div>
                </td>
            </tr>
        );
    }

    componentDidMount() {
        this.refreshLogs();
        ipcRndr.on("update-appliance-list", (event, message, newApplianceName) => {
            this.refreshLogs();
        });
    }

    componentWillUnmount() {
        ipcRndr.removeAllListeners("update-appliance-list");
    }

    render() {
        const currDate = new Date();
        if (this.state.subtab == "detectionLog") {
            return (
                <div>
                    <AppHeader />
                    <div id="logBox">
                        {this.returnTabs()}
                        <div id="logShow">
                            <div id="captionLog">{mainPage_lang.LOGS_DETECTION_LOG}</div>
                            <div id="whiteSpaceForLogTable">
                                <Button
                                    text={mainPage_lang.LOGS_BUTTON_SAVE}
                                    available="true"
                                    onClick={this.saveLogs.bind(this, "text123", "logs.txt", "text/plain")}
                                    className="save-log-btn"
                                />
                                <Button
                                    text={mainPage_lang.LOGS_BUTTON_CLEAR}
                                    available="true"
                                    onClick={this.clearLogs}
                                    className="clear-log-btn"
                                />
                                {/*<div className="saveLogButton"
                                     onClick={this.saveLogs.bind(this, "text123", "logs.txt", "text/plain")}>
                                    <font>{mainPage_lang.LOGS_buttonSave}</font>
                                </div>*/}
                                {/*<div className="saveLogButton" onClick={this.clearLogs}>
                                    <font>{mainPage_lang.LOGS_buttonClear}</font>
                                </div>*/}
                                {/*<div id="buttonRenewLog" onClick={this.refreshLogs}>
                                    <img id="refIcon" src="icon/refresh.svg" height="20"/>
                                </div>*/}
                                <table id="detectionLogTable">
                                    <thead>
                                        <tr>
                                            <th>{mainPage_lang.LOGS_NAME}</th>
                                            <th>{mainPage_lang.LOGS_ADDR}</th>
                                            <th>{mainPage_lang.LOGS_STATE}</th>
                                            <th>{mainPage_lang.LOGS_TYPE}</th>
                                            <th>{mainPage_lang.LOGS_TIME}</th>
                                        </tr>
                                    </thead>
                                    <tbody id="detectionLogTableBody">{this.state.detLogs.storages.map(this.eachLog)}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <AppHeader />
                    <div id="logBox">
                        {this.returnTabs()}
                        <div id="logShow">
                            <div id="captionLog">{mainPage_lang.LOGS_EVENT_LOG}</div>
                            <div id="whiteSpaceForLogTable">
                                {/*<div id="buttonRenewLog">
                                    <img id="refIcon" src="icon/refresh.svg" height="20"/>
                                </div>*/}
                                <table id="eventLogTable">
                                    <thead>
                                        <tr>
                                            <th>{mainPage_lang.LOGS_NAME}</th>
                                            <th colSpan="3">{mainPage_lang.LOGS_TIME}</th>
                                        </tr>
                                    </thead>
                                    <tbody id="detectionLogTableBody">
                                        <tr>
                                            <td>
                                                <div>
                                                    <font> Open log page </font>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <font> {currDate.toUTCString()} </font>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default DetectionLog;
