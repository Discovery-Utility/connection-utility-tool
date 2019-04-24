const result = require('../check-result');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

function checkSysfsWireless() {
    // Get sysfs mountpoint
    return new Promise((resolve, reject) => {
        child_process.exec('mount', (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
                return;
            }

            stdout.split('\n').forEach((line) => {
                if (line.indexOf('type sysfs') != -1) {
                    resolve(line.split(' ')[2]);
                    return;
                }
            });
        });
    // Check if net exists
    }).then((sysroot) => {
        var netroot = path.join(sysroot, 'class', 'net');
        if (!fs.existsSync(netroot)) return null;

        var ifaces = fs.readdirSync(netroot);
        var wifiEnabled = false;
        ifaces.forEach((iface) => {
            if (iface.startsWith('w')) {
                var state = fs.readFileSync(path.join(netroot, iface, 'operstate'));
                if (state.indexOf('up') != -1) wifiEnabled = true;
            }
        })
        return wifiEnabled;
    }).catch((reason) => {
        console.err('sysfsWirelessCheck mount failed:', reason);
        return null;
    });
}

function checkIpLinkWireless() {
    return new Promise((resolve, reject) => {
        child_process.exec('ip link show', (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
                return;
            }

            var wifiEnabled = false;
            var wStateRegex = /^\d:\s*(w.*?):\s*<(.*?)>/gm;
            while ((wstate = wStateRegex.exec(stdout)) !== null) {
                var flags = wstate[2];
                // if interface is up and connected
                if (flags.indexOf('UP') !== -1 && flags.indexOf('NO-CARRIER') === -1) {
                    resolve(true);
                    return;
                }
            }
            resolve(false);
        }).catch((reason) => {
            console.err('ipLinkWirelessCheck failed:', reason);
            return null;
        })
    })
}

exports.wifiCheck = async function() {
    // Try all available methods until at least one returns something meaningful
    var sysfsCheckResult = await checkSysfsWireless();
    if (sysfsCheckResult !== null) return {status: sysfsCheckResult ? result.FAILED : result.PASSED};

    var ipLinkCheckResult = await checkIpLinkWireless();
    if (ipLinkCheckResult !== null) return {status: ipLinkCheckResult ? result.FAILED : result.PASSED};

    // If there's no result, confess
    return {status: result.UNKNOWN};
}