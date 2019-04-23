"use strict";

/**
 * main.js need to create application window.
 * And parse appliances data. (from network or demo data)
 */

const env = require("./app_environment");
const demo_data = require("./demo/demo_data");

const wifi = require("node-wifi");
const net = require("net");

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const os = require("os");

let win;

function allInterfaces() {
  var networks = os.networkInterfaces();
  var res = [];

  Object.keys(networks).forEach(function(k) {
    for (var i = 0; i < networks[k].length; i++) {
      var iface = networks[k][i];
      if (iface.family === "IPv4") {
        res.push(iface.address);
        // could only addMembership once per interface (https://nodejs.org/api/dgram.html#dgram_socket_addmem..)
        break;
      }
    }
  });

  return res;
}

var bonjour = require("bonjour")({ interface: allInterfaces() });
var browser = null;

// Info about devices, that will be sent to the UI part of the app
var storages = {
  storages: []
};
var logs = {
  storages: []
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
  var datestring =
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2) +
    " " +
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear();
  return datestring;
}

// The event handler for the emergence of a new device in the network
function appOnUp(service) {
  console.log("#######################################\nadding");
  console.log("Service found under the name: " + service.name);

  // New discovered device name parsing

  var namearr = service.name.split("_");
  if (namearr[0] == "PSApp" || namearr[0] == "PSCluster") {
    var tmp = JSON.parse(storages);
    var tmpLog = JSON.parse(detectionLog);
    var newelem = {
      link: "",
      name: "",
      state: "",
      type: "",
      cluster: ""
    };
    console.log("Success");
    newelem.name = namearr[1];
    newelem.link = "https://" + service.referer.address + ":" + service.port;
    if (namearr[4] == "Management") {
      newelem.state = "configured";
    } else if (namearr[4] == "Unconfigured") {
      newelem.state = "unconfigured";
    } else {
      newelem.state = "service state";
    }
    if (namearr[2] == "Virtual") {
      newelem.type = "VMware";
    } else {
      newelem.type = "SAN";
    }
    if (namearr[0] == "PSApp") {
      newelem.cluster = "false";
    } else newelem.cluster = "true";

    console.log("Current appliance:\n" + jsonParseString(newelem));
    //tmp.storages.push(newelem);
    if (tmp != null) {
      if (tmp.storages.length == 0) {
        tmp.storages.push(newelem);
        tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
        console.log(
          "Discovered appliance:\n" + jsonParseString(tmpLog.storages[0]) + "\n"
        );
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
            console.log(
              "Discovered appliance:\n" +
                jsonParseString(tmpLog.storages[0]) +
                "\n"
            );
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
          console.log(
            "Discovered appliance:\n" +
              jsonParseString(tmpLog.storages[0]) +
              "\n"
          );
          if (tmpLog.storages.length > 1000) {
            tmpLog.storages.splice(1000, tmpLog.storages.length - 1000);
          }
        }
      }
    } else {
      tmp.storages.push(newelem);
      tmpLog.storages.splice(0, 0, addTypeInLogs(newelem));
      console.log(
        "Discovered appliance:\n" + jsonParseString(tmpLog.storages[0]) + "\n"
      );
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
      win.webContents.send("ping", storages, detectionLog);
    } catch (err) {}
  } else console.log("Service does not match the name parameters");
}

// The event handler for device disconnecting from the network
function appOnDown(service) {
  console.log("#######################################\ndeleting");
  console.log(
    'Service under the name "' + service.name + '" is removed from the network'
  );
  var namearr = service.name.split("_");
  var tmp = JSON.parse(storages);
  var tmpLog = JSON.parse(detectionLog);
  for (var i = 0; i < tmp.storages.length; i++) {
    if (tmp.storages[i].name == namearr[1]) {
      tmpLog.storages.splice(0, 0, delTypeInLogs(tmp.storages[i]));
      console.log(
        "Disappeared appliance:\n" + jsonParseString(tmpLog.storages[0]) + "\n"
      );
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
    win.webContents.send("ping", storages, detectionLog);
  } catch (err) {}
}

// Restart services browsing in the network
function bonjourLoad(refresh) {
  // reset of existing data
  if (refresh) {
    let data = env.DEMO_MODE ? demo_data : { storages: [] };
    storages = jsonParseString(data);
  }
  // Discovering of devices with type "http"
  browser = bonjour.find({ type: "http" });
  // setting function for handling the emergence of new devices in the network
  browser.on("up", appOnUp);
  // setting function to handle the disappearance of devices in the network
  browser.on("down", appOnDown);

  try {
    win.webContents.send("ping", storages, detectionLog);
  } catch (err) {}
}

bonjourLoad(false);

ipcMain.on("refresh", (event, arg) => {
  if (browser != null) {
    bonjourLoad(true);
  }
});

ipcMain.on("clearDetectLog", (event, arg) => {
  var logs = {
    storages: []
  };
  detectionLog = jsonParseString(logs);

  try {
    win.webContents.send("ping", storages, detectionLog);
  } catch (err) {}
});

let connectWindow;
let linkToAppliance = "";
ipcMain.on("connect-to-appliance", (event, arg) => {
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
  connectWindow.once("ready-to-show", () => {
    win.webContents.send("redirect-to-browser", linkToAppliance);
  });
});

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
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
      let exec = require("child_process").exec;
      let path = env.PATH_TO_CERT_EXE + '"' + certData + '"';
      win.webContents.send("print-to-console", path);

      let result = "";
      let child = exec(path);

      //stdout from cert exe
      child.stdout.on("data", function(data) {
        result += data;
      });

      //stderr from cert exe
      child.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        win.webContents.send("print-to-console", data);
      });

      //cert exe closed (certificate imported)
      child.on("close", function() {
        console.log("done");
        console.log(result);

        //open browser
        if (linkToAppliance) {
          win.webContents.send("redirect-to-browser", linkToAppliance);
        }
      });
    }
  }
);

function createWindow() {
  // Creating a browser window "win" - the app window
  win = new BrowserWindow({
    width: 1250,
    height: 700,
    minWidth: 800,
    minHeight: 650,
    icon: __dirname,
    autoHideMenuBar: true
    //frame: false
  });

  // download index.html
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Developer Menu
  //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Menu.setApplicationMenu(mainMenu);

  // Console
  if (env.SHOW_DEV_CONSOLE) {
    win.webContents.openDevTools();
  }

  win.webContents.on("did-finish-load", () => {
    try {
      win.webContents.send("ping", storages, detectionLog);
    } catch (err) {}
  });
  win.webContents.on("will-finish-launching", () => {
    try {
      win.webContents.send("ping", storages, detectionLog);
    } catch (err) {}
  });
  win.webContents.on("page-title-updated", () => {
    try {
      win.webContents.send("ping", storages, detectionLog);
    } catch (err) {}
  });
  win.on("closed", () => {
    app.quit();
    win = null;
  });

  // Absolutely necessary even to set interface to null
  wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });

  // get current networks
  wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
      console.log(err);
    }

    console.log(currentConnections);
    if (currentConnections != undefined) {
      win.webContents.on("did-finish-load", () => {
        win.webContents.send("wifi", currentConnections.length, "wifi");
      });
    }
  });
}

app.on("ready", createWindow);

// Exit the application when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    bonjour.destroy();
  }
});

// Initialize wifi module

ipcMain.on("off-wifi", () => {
  console.log("off-wifi");
  // Scan networks
  wifi.scan(function(err, networks) {
    if (err) {
      console.log(err);
    } else {
      console.log(networks);

      for (var i = 0; i < networks.length; i++) {
        if (networks[i].security !== "Open") {
          wifi.connect(
            { ssid: networks[i].ssid, password: "password" },
            function(err) {
              if (err) {
                console.log(err);
              }
              console.log("Connected");
            }
          );
          i = networks.length;
        }
      }
    }
  });
});
