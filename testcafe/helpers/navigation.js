import {Selector, t} from "testcafe";
import {ReactSelector} from "testcafe-react-selectors";
import env from "../../src/app_environment";
import translation from "../../src/app/locales/translation";

const MILLISECONDS_DELAY = env.SEARCH_DELAY * 1000 + 10;

/**
 * Navigate from Welcome page to Search page
 */
export async function navigateToSearchPage() {
    const redirectButton = ReactSelector("Button").withProps("text", translation.SCAN_APPLIANCES);
    const searchPage = ReactSelector("SearchPage");

    await t.click(redirectButton);
    await t.expect(searchPage.exists).ok();
}

/**
 * Navigate from Welcome page to Rescan page
 */
export async function navigateToRescanPage() {
    const cancelSearchButton = ReactSelector("ButtonOutline");
    const rescanPage = ReactSelector("RescanPage");

    await navigateToSearchPage();

    await t.click(cancelSearchButton);
    await t.expect(rescanPage.exists).ok();
}

/**
 * Navigate from Welcome page to Appliances page
 * @param {Boolean} isConfiguredScreen - if true, navigates to configured screen of Appliances page
 */
export async function navigateToAppliancePage(isConfiguredScreen) {
    const appliancesPage = ReactSelector("AppliancesPage");

    await navigateToSearchPage();

    await t.wait(MILLISECONDS_DELAY);
    await t.expect(appliancesPage.exists).ok();

    if (isConfiguredScreen) {
        await t.click("#pageButtonConfigured");
    }
}

/**
 * Navigate to Help page
 */
export async function navigateToHelpPage() {
    const link = ReactSelector("Link").withProps("to", "/help");
    const helpPage = ReactSelector("HelpPage");

    await t.click(link);
    await t.expect(helpPage.exists).ok();
}

/**
 * Navigate to DetectionLog page
 */
export async function navigateToLogPage() {
    const link = ReactSelector("Link").withProps("to", "/log");
    const logPage = ReactSelector("DetectionLog");

    await t.click(link);
    await t.expect(logPage.exists).ok();
}

/**
 * Start rescan process from Appliance page
 */
export async function rescanFromAppliancePage() {
    const searchPage = ReactSelector("SearchPage");
    const appliancesPage = ReactSelector("AppliancesPage");
    const scanAgainButton = Selector("div.available-appliances-rescan-text");

    await t.click(scanAgainButton);

    await t.expect(searchPage.exists).ok();
    await t.wait(MILLISECONDS_DELAY);
    await t.expect(appliancesPage.exists).ok();
}
