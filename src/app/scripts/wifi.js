import { contains } from './contains';

const exec = require('child_process').exec;

const platform = process.platform;

export const checkWifi = function() {
    if (platform === 'win32') {
        return new Promise((resolve) => {
            exec('chcp 65001 | netsh interface show interface',
                (error, stdout) => {
                    exec('chcp 866', () => {
                        resolve(stdout.toString().split('\r\n')
                            .filter(el => contains(el, 'Wireless', 'Wi-Fi', 'Беспроводная сеть') && contains(el, 'Connected'))
                            .length !== 0);
                    });
                });
        });
    }
    if (platform === 'linux') {
        return new Promise((resolve) => {
            exec('nmcli radio wifi',
                (error, stdout) => {
                    resolve(stdout === 'enabled\n');
                });
        });
    }
};

export const disableWifi = function () {
    if (platform === 'win32') {
            exec('netsh wlan disconnect');
    } else if (platform === 'linux') {
            exec('nmcli radio wifi off');
    }
};
