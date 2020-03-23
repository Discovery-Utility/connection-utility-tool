import {Selector} from "testcafe";
import {waitForReact, ReactSelector} from "testcafe-react-selectors";
import {
    navigateToAppliancePage,
    navigateToRescanPage,
    navigateToSearchPage,
    navigateToHelpPage,
    navigateToLogPage
} from "./helpers/navigation";

fixture("AppHeader component tests")
    .page("../src/index.html")
    .beforeEach(async () => {
        await waitForReact();
    });

const logo = Selector(".navbar").find(".logo");
const welcomePage = ReactSelector("WelcomePage");

test("Should open Help page", async t => {
    await navigateToHelpPage();
});

test("Should open Log page", async t => {
    await navigateToLogPage();
});

test("Should get back to Welcome page from Search page by clicking on logo", async t => {
    await navigateToSearchPage();
    await t.click(logo);
    await t.expect(welcomePage.exists).ok();
});

test("Should get back to Welcome page from Rescan page by clicking on logo", async t => {
    await navigateToRescanPage();
    await t.click(logo);
    await t.expect(welcomePage.exists).ok();
});

test("Should get back to Welcome page from Appliance page by clicking on logo", async t => {
    await navigateToAppliancePage();
    await t.click(logo);
    await t.expect(welcomePage.exists).ok();
});
