const exec = require('child_process').exec;

let platform = process.platform;

const contains = function () {
    let flag = false;
    for (let i = 1; i < arguments.length; i++) {
        flag = flag || arguments[0].includes(arguments[i]);
    }
    return flag;
};

export const check_bluetooth = function(){
    if (platform === 'win32') {
        return new Promise(resolve => {
            exec('chcp 65001 | ipconfig',
                function (error, stdout) {
                    exec('chcp 866', function() {
                        resolve(stdout.split('\r\n').filter(el => contains(el, 'Bluetooth')).length !== 0);
                    });
                });
        });
    }
    else if (platform === 'linux'){
        return new Promise(resolve => {
            exec('hcitool dev',
                function (error, stdout) {
                    const parsedStatus  = stdout.split(':\n\t');
                    resolve(parsedStatus[1] !== undefined);
                });
        });
    }
};

export const disable_bluetooth = function () {
    if (platform === 'linux'){
        exec('rfkill block bluetooth');
    }
};