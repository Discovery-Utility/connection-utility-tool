import React from 'react';
import mainPage_lang from "../../locales/translation";

class DetectionLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detLogs: JSON.parse(localStorage.getItem('logs')),
            eventLogs: JSON.parse(localStorage.getItem('eventlogs')),
            subtab: "detectionLog"
        }
        // this.state = JSON.parse(localStorage.getItem('logs'));
        this.changeSubtabs = this.changeSubtabs.bind(this);
        this.returnTabs = this.returnTabs.bind(this);
        this.eachLog = this.eachLog.bind(this);
        this.refreshButton = this.refreshButton.bind(this);
        this.saveLogs = this.saveLogs.bind(this);
        this.clearLogs = this.clearLogs.bind(this);
    };

    refreshButton() {
        this.state.detLogs = JSON.parse(localStorage.getItem('logs'));
        this.forceUpdate();
    }

    changeSubtabs(subtab) {
        this.setState({
            subtab: subtab
        });
        var subtabs = document.getElementsByClassName("subtabs");
        for (var i = 0; i < subtabs.length; i++) {
            subtabs[i].style.color = "#555555";
            subtabs[i].style.backgroundColor = "white";
            ;
        }
        var selectSubtub = document.getElementById(subtab).style;
        selectSubtub.color = "#248dc0";
        selectSubtub.backgroundColor = "#eeeeee";
    };

    // Cleare detection logs
    clearLogs() {
        var tmp = {
            "storages": []
        };
        var logs = JSON.stringify(tmp, "", 4);
        localStorage.setItem('logs', logs);
        ipcRndr.send('clearDetectLog', "Clear logs");
        this.refreshButton();
    }

    // Save detection logs
    saveLogs(text, name, type) {
        var logStor = this.state.detLogs.storages;
        text = "";
        for (var i = 0; i < logStor.length; i++) {
            text += logStor[i].date +
                " " + logStor[i].status +
                ":" + logStor[i].name +
                "._" + logStor[i].type +
                "._" + logStor[i].state +
                "._" + logStor[i].cluster +
                " " + logStor[i].link.slice(7) + '\n';
        }
        var logFile = new Blob([text], {type: type});
        var a = document.createElement("a"),
            url = URL.createObjectURL(logFile);
        console.log(url);
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

    }

    returnTabs() {
        return (
            <div id="logSwitch">
                <div id="systemLogs">
                    {mainPage_lang.Logs_SystemLogs}
                </div>
                <div className="subtabs detectionLog" id="detectionLog"
                     onClick={this.changeSubtabs.bind(this, "detectionLog")}>
                    {mainPage_lang.Logs_DetectionLog}
                </div>
                <div className="subtabs eventLog" id="eventLog" onClick={this.changeSubtabs.bind(this, "eventLog")}>
                    {mainPage_lang.Logs_EventLog}
                </div>
            </div>
        );
    }

    eachLog(item, i) {
        return (
            <tr key={i}>
                <td>
                    <div><font> {item.name + " " + item.status} </font></div>
                </td>
                <td>
                    <div><font> {item.link.slice(7)} </font></div>
                </td>
                <td>
                    <div><font> {item.state} </font></div>
                </td>
                <td>
                    <div><font> {item.type} </font></div>
                </td>
                <td>
                    <div><font> {item.date} </font></div>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.subtab == "detectionLog") {
            return (
                <div id="logBox">
                    {this.returnTabs()}
                    <div id="logShow">
                        <div id="captionLog">
                            {mainPage_lang.Logs_DetectionLog}
                        </div>
                        <div id="whiteSpaceForLogTable">
                            <div className="saveLogButton"
                                 onClick={this.saveLogs.bind(this, "text123", "logs.txt", "text/plain")}>
                                <font>{mainPage_lang.Logs_buttonSave}</font>
                            </div>
                            <div className="saveLogButton" onClick={this.clearLogs}>
                                <font>{mainPage_lang.Logs_buttonClear}</font>
                            </div>
                            <div id="buttonRenewLog" onClick={this.refreshButton}>
                                <img id="refIcon" src="icon/refresh.svg" height="20"/>
                            </div>
                            <table id="detectionLogTable">
                                <thead>
                                <tr>
                                    <th>{mainPage_lang.Logs_Name}</th>
                                    <th>{mainPage_lang.Logs_Addr}</th>
                                    <th>{mainPage_lang.Logs_State}</th>
                                    <th>{mainPage_lang.Logs_Type}</th>
                                    <th>{mainPage_lang.Logs_Time}</th>
                                </tr>
                                </thead>
                                <tbody id="detectionLogTableBody">
                                {this.state.detLogs.storages.map(this.eachLog)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="logBox">
                    {this.returnTabs()}
                    <div id="logShow">
                        <div id="captionLog">
                            {mainPage_lang.Logs_EventLog}
                        </div>
                        <div id="whiteSpaceForLogTable">
                            <div id="buttonRenewLog">
                                <img id="refIcon" src="icon/refresh.svg" height="20"/>
                            </div>
                            <table id="eventLogTable">
                                <thead>
                                <tr>
                                    <th>{mainPage_lang.Logs_Name}</th>
                                    <th colSpan="3">{mainPage_lang.Logs_Time}</th>
                                </tr>
                                </thead>
                                <tbody id="detectionLogTableBody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    };
};

export default (DetectionLog);
