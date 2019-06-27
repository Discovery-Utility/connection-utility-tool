
const exec = require('child_process').exec;

const WirelessWindowsE = "Wireless";
const WirelessWindowsR = "Беспроводная сеть";

let platform = process.platform;

const contains = function () {
    let flag = false;
    for (let i = 1; i < arguments.length; i++)
        flag = flag || arguments[0].includes(arguments[i]);
    return flag;
};

export const check_wifi = function(){
    if (platform === 'win32') {
        return new Promise(resolve => {
            exec('chcp 65001 | netsh interface show interface',
                function (error, stdout) {
                    exec('chcp 866', function(){
                        resolve(stdout.toString().split('\r\n')
                            .filter(el => contains(el, WirelessWindowsR, WirelessWindowsE) && contains(el, 'Connected'))
                            .length !== 0);
                    });
                });
        });
    }
    else if (platform === 'linux'){
        return new Promise(resolve => {
            exec('nmcli radio wifi',
                function (error, stdout) {
                    resolve(stdout === 'enabled\n');
                });
        });
    }
};

export const disable_wifi = function () {
    if (platform === 'win32') {
            exec('netsh wlan disconnect');
    } else if (platform === 'linux'){
            exec('nmcli radio wifi off');
    }
};
