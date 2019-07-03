import { contains } from './contains';

const exec = require('child_process').exec;

const platform = process.platform;

export const checkFirewall = function() {
    if (platform === 'win32') {
        return new Promise((resolve) => {
            exec('chcp 65001 | netsh advfirewall show allprofiles',
                (error, stdout) => {
                    exec('chcp 866', () => {
                        const arr = stdout.split('\r\n').filter(el => contains(el, 'State', 'Состояние'));
                        resolve(contains(arr[1], 'ON', 'ВКЛЮЧИТЬ') || contains(arr[2], 'ON', 'ВКЛЮЧИТЬ'));
                    });
                });
        });
    }
    if (platform === 'linux') {
        /* Requires root user privileges */
        return new Promise((resolve) => {
            exec('ufw status', (error, stdout) => {
                const parsedStatus = stdout.split(': ');
                (parsedStatus[1] === 'активен\n' || parsedStatus[1] === 'active\n')
                    ? resolve(true) : resolve(false);
            });
        });
    }
};

/* Requires root user privileges */
export const disableFirewall = function () {
    if (platform === 'win32') {
        exec('netsh advfirewall set publicprofile state off | netsh advfirewall set privateprofile state off');
    } else if (platform === 'linux') {
        exec('ufw disable');
    }
};
