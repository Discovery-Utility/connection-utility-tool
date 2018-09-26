"use strict";

/**
 * main.js need to create application window.
 * And parse appliances data. (from network or demo data)
 */

const env = require("./app_environment");
const demo_data = require("./demo/demo_data");

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');

let win;

function allInterfaces() {
    var networks = os.networkInterfaces()
    var res = []


    Object.keys(networks).forEach(function (k) {
        for (var i = 0; i < networks[k].length; i++) {
            var iface = networks[k][i]
            if (iface.family === 'IPv4') {
                res.push(iface.address)
                // could only addMembership once per interface (https://nodejs.org/api/dgram.html#dgram_socket_addmem..)
                break
            }
        }
    });

    return res
}

var bonjour = require('bonjour')({interface: allInterfaces()});
var browser = null;

// Info about devices, that will be sent to the UI part of the app
var storages = {
    "storages": []
};
var logs = {
    "storages": []
};

if (env.DEMO_MODE) {
    storages = demo_data;
}

// function JSON.stringify():  convert object into a string
function jsonParseString(json) {
    // Indented 4 spaces
    return JSON.stringify(json, "", 4);
}

var storages = jsonParseString(storages);
var detectionLog = jsonParseString(logs);

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

function addTypeInLogs(obj) {
    var newLogElem = clone(obj);
    newLogElem.date = currDate();
    newLogElem.status = "discovered";
    return newLogElem;
}

function delTypeInLogs(obj) {
    var newLogElem = clone(obj);
    newLogElem.date = currDate();
    newLogElem.status = "disappeared";
    return newLogElem;
}

function currDate() {
    var d = new Date();
    var datestring = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" +
        ("0" + d.getSeconds()).slice(-2) + " " + ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();
    return datestring;
}

// The event handler for the emergence of a new device in the network
function appOnUp(service) {
    console.log('#######################################\nadding');
    console.log('Service found under the name: ' + service.name);

    // New discovered device name parsing

    var namearr = service.name.split('_');
    if ((namearr[0] == 'CycApp') || (namearr[0] == 'CycCluster')) {
        var tmp = JSON.parse(storages);
        var tmpLog = JSON.parse(detectionLog);
        var newelem = {
            "link": "",
            "name": "",
            "state": "",
            "type": "",
            "cluster": ""

        };
        console.log('Success');
        newelem.name = namearr[1];
        newelem.link = 'http://' + service.referer.address + ':' + service.port;
        if (namearr[4] == 'Management') {
            newelem.state = 'configured';
        }
        else if (namearr[4] == 'Unconfigured') {
            newelem.state = 'unconfigured';
        }
        else {
            newelem.state = 'service state';
        }
        if (namearr[2] == 'Virtual') {
            newelem.type = 'VMware';
        }
        else {
            newelem.type = 'SAN';
        }
        if (namearr[0] == 'CycApp') {
            newelem.cluster = 'false';
        }
        else newelem.cluster = 'true';

        console.log('Current appliance:\n' + jsonParseString(newelem));
        //tmp.storages.push(newelem);
        if (tmp != null) {
            if (tmp.storages.length == 0) {
                tmp.storages.push(newelem);
                tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
                console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                if (tmpLog.storages.length > 1000) {
                    tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                }
            } else {
                var isInserted = false;
                for (var i = 0; i < tmp.storages.length; i++) {
                    if (tmp.storages[i].name == newelem.name) {
                        isInserted = true;
                        break;
                    }
                    if (tmp.storages[i].name > newelem.name) {
                        tmp.storages.splice(i, 0, newelem);
                        tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
                        console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                        if (tmpLog.storages.length > 1000) {
                            tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                        }
                        isInserted = true;
                        break;
                    }
                }
                if (!isInserted) {
                    tmp.storages.push(newelem);
                    tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
                    console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                    if (tmpLog.storages.length > 1000) {
                        tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                    }
                }
            }
        } else {
            tmp.storages.push(newelem);
            tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
            console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
            if (tmpLog.storages.length > 1000) {
                tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
            }
        }
        storages = jsonParseString(tmp);
        detectionLog = jsonParseString(tmpLog);

        //storages = tmp
        //console.log('current storageList:\n' + storages);

        // Send data to the UI part
        try {
            win.webContents.send('ping', storages, detectionLog);
        }
        catch (err) {
        }
    }
    else console.log('Service does not match the name parameters');
}

// The event handler for device disconnecting from the network
function appOnDown(service) {
    console.log('#######################################\ndeleting');
    console.log('Service under the name "' + service.name + '" is removed from the network');
    var namearr = service.name.split('_');
    var tmp = JSON.parse(storages);
    var tmpLog = JSON.parse(detectionLog);
    for (var i = 0; i < tmp.storages.length; i++) {
        if (tmp.storages[i].name == namearr[1]) {
            tmpLog.storages.splice(0, 0, delTypeInLogs(tmp.storages[i]));
            console.log('Disappeared appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
            if (tmpLog.storages.length > 1000) {
                tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
            }
            tmp.storages.splice(i, 1);
            break;
        }
    }
    storages = jsonParseString(tmp);
    detectionLog = jsonParseString(tmpLog);
    try {
        win.webContents.send('ping', storages, detectionLog);
    }
    catch (err) {
    }
}

// Restart services browsing in the network
function bonjourLoad(refresh) {
    // reset of existing data
    if (refresh) {
        var stor = {
            "storages": []
        };
        storages = jsonParseString(stor);
    }

    // Discovering of devices with type "http"
    browser = bonjour.find({type: 'http'})
    // setting function for handling the emergence of new devices in the network
    browser.on('up', appOnUp);
    // setting function to handle the disappearance of devices in the network
    browser.on('down', appOnDown);

    try {
        win.webContents.send('ping', storages, detectionLog)
    }
    catch (err) {
    }
}

bonjourLoad(false);

ipcMain.on('refresh', (event, arg) => {
    if (browser != null) {
        bonjourLoad(true);
    }
});

ipcMain.on('clearDetectLog', (event, arg) => {
    var logs = {
        "storages": []
    };
    detectionLog = jsonParseString(logs);

    try {
        win.webContents.send('ping', storages, detectionLog)
    }
    catch (err) {
    }
});


function createWindow() {
    // Creating a browser window "win" - the app window
    win = new BrowserWindow({
        width: 1250, height: 600,
        icon: __dirname,
        autoHideMenuBar: true,
        //frame: false
    });

    // download index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Developer Menu
    //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Menu.setApplicationMenu(mainMenu);

    // Console
    // win.webContents.openDevTools();

    win.webContents.on('did-finish-load', () => {
        try {
            win.webContents.send('ping', storages, detectionLog)
        }
        catch (err) {

        }
    })
    win.webContents.on('will-finish-launching', () => {
        try {
            win.webContents.send('ping', storages, detectionLog)
        }
        catch (err) {

        }
    })
    win.webContents.on('page-title-updated', () => {
        try {
            win.webContents.send('ping', storages, detectionLog)
        }
        catch (err) {

        }
    })
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

// Exit the application when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        bonjour.destroy()
    }
})
