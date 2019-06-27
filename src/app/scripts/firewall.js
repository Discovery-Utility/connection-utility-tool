const exec = require('child_process').exec;

let platform = process.platform;

const contains = function () {
    let flag = false;
    for (let i = 1; i < arguments.length; i++)
        flag = flag || arguments[0].includes(arguments[i]);
    return flag;
};

export const check_firewall = function(){
    if (platform === 'win32') {
        return new Promise(resolve => {
            exec('chcp 65001 | netsh advfirewall show allprofiles',
                function (error, stdout) {
                    exec('chcp 866', function() {
                        let arr = stdout.split('\r\n').filter(el => contains(el, 'State', 'Состояние'));
                        resolve(contains(arr[1], 'ON', 'ВКЛЮЧИТЬ') || contains(arr[2], 'ON', 'ВКЛЮЧИТЬ'));
                    });
            });
        });
    }
    else if (platform === 'linux'){
        /* Requires root user privileges */
        return new Promise(resolve => {
            exec('ufw status', function (error, stdout) {
                const parsedStatus = stdout.split(': ');
                (parsedStatus[1] === 'активен\n' || parsedStatus[1] === 'active\n') ?
                    resolve(true) : resolve(false);
            });
        });
    }
};

/* Requires root user privileges */
export const disable_firewall = function () {
    if (platform === 'win32') {
        exec('netsh advfirewall set publicprofile state off | netsh advfirewall set privateprofile state off');
    } else if (platform === 'linux'){
        exec('ufw disable');
    }
};