import { contains } from './contains';

const exec = require('child_process').exec;

const platform = process.platform;

export const checkBluetooth = function() {
    if (platform === 'win32') {
        return new Promise((resolve) => {
            exec('chcp 65001 | ipconfig',
                (error, stdout) => {
                    exec('chcp 866', () => {
                        resolve(stdout.split('\r\n').filter(el => contains(el, 'Bluetooth')).length !== 0);
                    });
                });
        });
    }
    if (platform === 'linux') {
        return new Promise((resolve) => {
            exec('hcitool dev',
                (error, stdout) => {
                    const parsedStatus = stdout.split(':\n\t');
                    resolve(parsedStatus[1] !== undefined);
                });
        });
    }
};

export const disableBluetooth = function () {
    if (platform === 'linux') {
        exec('rfkill block bluetooth');
    }
};
