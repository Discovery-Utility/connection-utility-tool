import { contains } from './string_extensions'

const exec = require('child_process').exec;

let platform = process.platform;

//checks bluetooth is enabled
export const check_bluetooth = function(){
    if (platform === 'win32') {
        return new Promise(resolve => {
            exec('chcp 65001 | ipconfig', //chcp 65001: set encoding to exec terminal command on windows
                function (error, stdout) {
                    exec('chcp 866', function() { //chcp 866: set encoding to get correct data from stdout
                        resolve(stdout.split('\r\n').filter(el => contains(el, 'Bluetooth')).length !== 0);
                    });
                });
        });
    }
    else if (platform === 'linux'){
        return new Promise(resolve => {
            exec('hcitool dev',
                function (error, stdout) {
                    let parsedStatus = stdout.split(':\n')[1].split('h'); //it definitely needs to be rewritten
                    if (parsedStatus[1] !== undefined)
                        resolve(true);
                    resolve(false);
                });

        });
    }
};
