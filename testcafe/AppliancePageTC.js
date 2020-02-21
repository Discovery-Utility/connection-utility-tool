import {Selector, t} from "testcafe";
import {waitForReact, ReactSelector} from "testcafe-react-selectors";
import {navigateToAppliancePage, rescanFromAppliancePage} from "./helpers/navigation";
import {parseLocalStorage} from "./helpers/localStorage";
import translation from "../src/app/locales/translation";
import Constants from "../src/app/constants/Constants";
const exec = require("child_process").exec;

const UNCONFIGURED_SCREEN = false;
const CONFIGURED_SCREEN = true;

const CMD_APPLIANCE = "PSA_--ApplianceTest--_v1_X_EX-1_HWType_Block_0";
const CMD_CLUSTER = "PSC_--ClusterTest--_v1_X_EX-1_HWType_Block_3";

fixture("AppliancePage container tests")
    .page("../src/index.html")
    .beforeEach(async () => {
        await waitForReact();
    });

/**
 * Test the pagination buttons on Appliances page
 * @param {Boolean} isConfiguredScreen - set the proper screen for testing
 */
const testPaginationButtons = async isConfiguredScreen => {
    await navigateToAppliancePage(isConfiguredScreen);

    const applianceList = await parseLocalStorage(isConfiguredScreen);

    const pagination = Math.ceil(applianceList.length / Constants.APPLIANCE_PAGE.MAX_APPLIANCES_ON_PAGE);

    let paginationButton;
    let actualTopApplianceName;
    let calculatedTopApplianceName;

    for (let i = 1; i < pagination + 1; i++) {
        // Choose a new button in pagination
        paginationButton = ReactSelector("li")
            .withKey(i)
            .find("a");

        await t.expect(paginationButton.exists).ok();
        await t.click(paginationButton);

        // Compare top appliance name from the page and from the appliance list
        actualTopApplianceName = ReactSelector("Appliance")
            .nth(0)
            .find("p.app-name");
        calculatedTopApplianceName = applianceList[(i - 1) * Constants.APPLIANCE_PAGE.MAX_APPLIANCES_ON_PAGE].name;

        await t.expect(actualTopApplianceName.textContent).eql(calculatedTopApplianceName);
    }
};

/**
 * Test the ability to detect new appliances & clusters
 * @param {string} cmdArg
 * @param {Boolean} isConfiguredScreen
 */
const testDetection = async (cmdArg, isConfiguredScreen) => {
    const platform = process.platform;

    await navigateToAppliancePage(isConfiguredScreen);

    let firstAppliance = ReactSelector("Appliance")
        .nth(0)
        .find("p.app-name");
    const testName = cmdArg.split("_")[1];

    let publish;

    // Check that test appliance hasn't been published yet
    await t.expect(firstAppliance.textContent).notEql(testName);

    // Execute publishing script
    if (platform === Constants.PLATFORM_TYPES.WIN) {
        publish = exec(`dns-sd -R ${cmdArg} _http._tcp . 3000`);
    } else if (platform === Constants.PLATFORM_TYPES.LINUX) {
        publish = exec(`avahi-publish-service ${cmdArg} _http._tcp 3000`);
    } else {
        console.log("This test is not runnable in your OS");
        return;
    }

    // Rescan the appliances
    await rescanFromAppliancePage();
    if (isConfiguredScreen) {
        await t.click("#Pagination_pageButtonConfigured");
    }

    // Check that test appliance appeared in the list
    firstAppliance = ReactSelector("Appliance")
        .nth(0)
        .find("p.app-name");
    await t.expect(firstAppliance.textContent).eql(testName);

    // Kill the child process
    if (platform === "win32") {
        exec(`taskkill /pid ${publish.pid} /f /t`);
    } else if (platform === "linux") {
        publish.kill();
    }
};

test("Should change pages from unconfigured to configured and vice versa", async t => {
    await navigateToAppliancePage(UNCONFIGURED_SCREEN);

    const applianceList = await parseLocalStorage(UNCONFIGURED_SCREEN);
    const clusterList = await parseLocalStorage(CONFIGURED_SCREEN);

    // Check if page shows proper appliances
    let topApplianceName = ReactSelector("Appliance")
        .nth(0)
        .find("p.app-name");
    await t.expect(topApplianceName.textContent).eql(applianceList[0].name);

    // Change screen to 'Configured' & check if page was changed and now it showing the cluster list
    await t.click("#Pagination_pageButtonConfigured");
    topApplianceName = ReactSelector("Appliance")
        .nth(0)
        .find("p.app-name");
    await t.expect(topApplianceName.textContent).eql(clusterList[0].name);

    // Change screen back to 'Unconfigured' & check if page again shows appliance list
    await t.click("#Pagination_pageButtonUnconfigured");
    topApplianceName = ReactSelector("Appliance")
        .nth(0)
        .find("p.app-name");
    await t.expect(topApplianceName.textContent).eql(applianceList[0].name);
});

test("Should change pages through pagination buttons on unconfigured page", async t => {
    await testPaginationButtons(UNCONFIGURED_SCREEN);
});

test("Should change pages through pagination buttons on configured page", async t => {
    await testPaginationButtons(CONFIGURED_SCREEN);
});

test("Should open Create Cluster screen when only one appliance was chosen", async t => {
    await navigateToAppliancePage(UNCONFIGURED_SCREEN);

    const appliance = ReactSelector("Appliance")
        .nth(0)
        .find("span");
    const popupButton = Selector(".popup-create-cluster-button").find("span");
    const createClusterButton = Selector(".create-cluster-screen").find(".button");
    const cancelButton = Selector(".create-cluster-screen-cancel");

    // Choose appliance
    await t.click(appliance);

    // Check popup & click to 'Create Cluster' button
    await t.expect(popupButton.exists).ok();
    await t.click(popupButton);

    // Check CC screen & click to 'Back' button
    await t.expect(createClusterButton.exists).ok();
    await t.expect(cancelButton.exists).ok();
    await t.click(cancelButton);
    await t.expect(createClusterButton.exists).notOk();
});

test("Should open Create Cluster popup with disabled button when more than allowable number of appliances were chosen", async t => {
    await navigateToAppliancePage(UNCONFIGURED_SCREEN);

    const popupButton = Selector(".popup-create-cluster-button").find("span");
    const popupMessage = Selector(".mappleTip");
    let appliance;

    for (let i = 0; i < Constants.APPLIANCE_PAGE.MAX_SELECT_APPLIANCES + 1; i++) {
        if (i % Constants.APPLIANCE_PAGE.MAX_APPLIANCES_ON_PAGE === 0) {
            // Go to proper page
            let paginationButton = ReactSelector("li")
                .withKey(i / Constants.APPLIANCE_PAGE.MAX_APPLIANCES_ON_PAGE + 1)
                .find("a");

            await t.expect(paginationButton.exists).ok();
            await t.click(paginationButton);
        }
        // Choose appliances
        appliance = ReactSelector("Appliance")
            .nth(i % Constants.APPLIANCE_PAGE.MAX_APPLIANCES_ON_PAGE)
            .find("span");
        await t.click(appliance);
    }
    // Check popup & tooltip message
    await t.expect(popupButton.exists).ok();
    await t.hover(popupButton);
    await t.expect(popupMessage.textContent).eql(translation.MAX_APPLIANCES_IN_CLUSTER);
});

test("Should show 'Launch Product Manager' popup", async t => {
    await navigateToAppliancePage(CONFIGURED_SCREEN);

    const firstCluster = ReactSelector("Appliance")
        .nth(0)
        .find("span");
    const secondCluster = ReactSelector("Appliance")
        .nth(2)
        .find("span");
    const popupButton = Selector(".popup-create-cluster-button").find("span");

    // Check Launch Product Manager popup
    await t.click(firstCluster);
    await t.expect(popupButton.exists).ok();

    // Check popup existance after changing cluster
    await t.click(secondCluster);
    await t.expect(popupButton.exists).ok();
});

test("Should rescan page", async t => {
    await navigateToAppliancePage(UNCONFIGURED_SCREEN);
    await rescanFromAppliancePage();
});

test("Should detect new appliance after rescan", async t => {
    await testDetection(CMD_APPLIANCE, UNCONFIGURED_SCREEN);
});

test("Should detect new cluster after rescan", async t => {
    await testDetection(CMD_CLUSTER, CONFIGURED_SCREEN);
});
