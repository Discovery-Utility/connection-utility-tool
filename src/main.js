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
const productName = "ProductName";

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

function getModelByCode(code, type) {
    var productModel = "";
    switch(code) {
        case "EX-1":
            productModel = "1000";
            break;
        case "EX-2":
            productModel = "3000";
            break;
        case "EX-3":
            productModel = "5000";
            break;
        case "EX-4":
            productModel = "7000";
            break;
        case "EX-5":
            productModel = "9000";
            break;
    }

    var typePostfix = "";
    if (type === 'HCI') {
        typePostfix = "X";
    }
    return productName + " " + productModel + typePostfix;
}

// The event handler for the emergence of a new device in the network
function appOnUp(service) {
    console.log('#######################################\nadding');
    console.log('System found under the name: ' + service.name);

    // New discovered system name parsing

// Service format should be (underscore delimited only):
// PSA|PSC_<SOMENAME>_<code-version>_<system-type>_<system-model>_<HW type>_Unified|Block_<system-state>
//    0         1           2              3              4           5           6             7

    const serviceNames = service.name.split('_');
    if (serviceNames[0] === 'PSA' || serviceNames[0] === 'PSC') {
        let tmp = JSON.parse(storages);
        let tmpLog = JSON.parse(detectionLog);
        let newElement = {
            "link": "",
            "name": "",
            "state": "",
            "type": "",
            "model": "",
            "cluster": "",
            "failed": ""
        };
        console.log('Success');

        //Is the system part of a cluster or a standalone system
        newElement.cluster = serviceNames[0] === 'PSA' ? 'false' : 'true';
        //Cluster name or system service ID
        newElement.name = serviceNames[1];
        //URL to access the system
        newElement.link = 'https://' + service.referer.address + ':' + service.port;
        //System type
        newElement.type = (serviceNames[3] === 'X') ? 'HCI' : 'BM';
        //System model
        newElement.model = getModelByCode(serviceNames[4], newElement.type);

        //System state
//  "Unconfigured", 0                 // system in factory state
//  "Unconfigured_Faulted", 1       // Hardware is in faulted state
//  "Configuring", 2                   // In the midst of being configured or unconfigured
//  "Configured", 3                     // system is configured
//  "Expanding", 4                       // System is adding a new appliance
//  "Removing", 5                         // System is removing an appliance
//  "Clustering_Failed", 6       // system in a bad state
//  "Unknown", 99                          // unknown state

        if (serviceNames[7] === '0' || serviceNames[7] === '1') {
            newElement.state = 'unconfigured';
        }
        else if (serviceNames[7] === '3' || serviceNames[7] === '4' || serviceNames[7] === '5') {
            newElement.state = 'configured';
        }
        else {
            newElement.state = 'service state';
        }

        newElement.failed = 'false';
        // Identify if system is healthy or not
        if (serviceNames[7] === '1' || serviceNames[7] === '6') {
            newElement.failed = 'true';
        }

        console.log('Current appliance:\n' + jsonParseString(newElement));
        //tmp.storages.push(newElement);
        if (tmp != null) {
            if (tmp.storages.length == 0) {
                tmp.storages.push(newElement);
                tmpLog.storages.splice(0, 0, addTypeInLogs(newElement));
                console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                if (tmpLog.storages.length > 1000) {
                    tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                }
            } else {
                var isInserted = false;
                for (var i = 0; i < tmp.storages.length; i++) {
                    if (tmp.storages[i].name == newElement.name) {
                        isInserted = true;
                        break;
                    }
                    if (tmp.storages[i].name > newElement.name) {
                        tmp.storages.splice(i, 0, newElement);
                        tmpLog.storages.splice(0, 0, addTypeInLogs(newElement));
                        console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                        if (tmpLog.storages.length > 1000) {
                            tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                        }
                        isInserted = true;
                        break;
                    }
                }
                if (!isInserted) {
                    tmp.storages.push(newElement);
                    tmpLog.storages.splice(0, 0, addTypeInLogs(newElement));
                    console.log('Discovered appliance:\n' + jsonParseString(tmpLog.storages[0]) + '\n');
                    if (tmpLog.storages.length > 1000) {
                        tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
                    }
                }
            }
        } else {
            tmp.storages.push(newElement);
            tmpLog.storages.splice(0, 0, addTypeInLogs(newElement));
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
            win.webContents.send("update-appliance-list", 'add');
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
        win.webContents.send("update-appliance-list", namearr[1]); // TODO: Check if name is unique
    }
    catch (err) {
    }
}

// Restart services browsing in the network
function bonjourLoad(refresh) {
    // reset of existing data
    if (refresh) {
        let data = env.DEMO_MODE ? demo_data : {"storages" : []};
        storages = jsonParseString(data);
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

let connectWindow;
let linkToAppliance = "";
ipcMain.on('connect-to-appliance', (event, arg) => {
    console.log("connect-to-appliance");
    linkToAppliance = arg;

    //try to connect url
    connectWindow = new BrowserWindow({
        parent: win,
        modal: true,
        show: false
    });
    connectWindow.loadURL(linkToAppliance);

    //event target url loaded
    connectWindow.once('ready-to-show', () => {
        win.webContents.send("redirect-to-browser", linkToAppliance);
    });
});


app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    console.log("cert-error");
    callback(false);
    win.webContents.send("print-to-console", certificate);
    //if target platform windows
    if (process.platform === "win32") {

        if (!certificate) {
            win.webContents.send("print-to-console", "certificate empty");
            if (linkToAppliance) {
                win.webContents.send("redirect-to-browser", linkToAppliance);
            }
            return;
        }
        let certData;
        if (certificate.issuerCert && certificate.issuerCert.data) {
            certData = certificate.issuerCert.data;
        } else if (certificate.data) {
            certData = certificate.data;
        } else {
            if (linkToAppliance) {
                win.webContents.send("redirect-to-browser", linkToAppliance);
            }
            return;
        }

        //CRLF -> LF (UNIX)
        certData = certData.replace(/([\r\n]|[\n])/g, "");

        //run child process cert exe
        let exec = require('child_process').exec;
        let path = env.PATH_TO_CERT_EXE + "\"" + certData + "\"";
        win.webContents.send("print-to-console", path);

        let result = '';
        let child = exec(path);

        //stdout from cert exe
        child.stdout.on('data', function(data) {
            result += data;
        });

        //stderr from cert exe
        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            win.webContents.send("print-to-console", data);

        });

        //cert exe closed (certificate imported)
        child.on('close', function() {
            console.log('done');
            console.log(result);

            //open browser
            if (linkToAppliance) {
                win.webContents.send("redirect-to-browser", linkToAppliance);
            }
        });
    } else {
            //open browser wihtout caring about certificates if we are not on Windows
            if (linkToAppliance) {
                win.webContents.send("redirect-to-browser", linkToAppliance);
            }

    }
});



function createWindow() {
    // Creating a browser window "win" - the app window
    win = new BrowserWindow({
        width: 1250, height: 700,
        minWidth: 800,
        minHeight: 650,
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
    if (env.SHOW_DEV_CONSOLE) {
        win.webContents.openDevTools();
    }

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
        app.quit();
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
