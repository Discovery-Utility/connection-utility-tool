import Constants from "../../src/app/constants/Constants";
const exec = require("child_process").exec;

/**
 * Script for publishing new appliances
 * @param {string[]} applianceList
 * @returns {ChildProcess[]}
 */
export async function execPublishProcess(applianceList) {
    const platform = process.platform;

    const childProcesses = [];

    // Execute publishing script
    if (platform === Constants.PLATFORM_TYPES.WIN) {
        applianceList.forEach(appliance => {
            const process = exec(`dns-sd -R ${appliance} _http._tcp . 3000`);
            childProcesses.push(process);
        });
    } else if (platform === Constants.PLATFORM_TYPES.LINUX) {
        applianceList.forEach(appliance => {
            const process = exec(`avahi-publish-service ${appliance} _http._tcp 3000`);
            childProcesses.push(process);
        });
    } else {
        console.log("This test is not runnable in your OS");
    }

    return childProcesses;
}

export async function killPublishProcess(childProcesses) {
    const platform = process.platform;

    // Kill the child process
    if (platform === Constants.PLATFORM_TYPES.WIN) {
        childProcesses.map(process => {
            exec(`taskkill /pid ${process.pid} /f /t`);
        });
    } else if (platform === Constants.PLATFORM_TYPES.LINUX) {
        childProcesses.map(process => {
            process.kill();
        });
    }
}
