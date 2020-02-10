import {Selector, t} from "testcafe";
import {waitForReact, ReactSelector} from "testcafe-react-selectors";
import {navigateToRescanPage} from "./helpers/navigation";
import translation from "../src/app/locales/translation";

fixture("RescanPage container tests")
    .page("../src/index.html")
    .beforeEach(async () => {
        await waitForReact();
    });

const modalLinkList = ["#connectToNetwork", "#disableWiFi", "#disableFirewall", "#manualDiscovery"];

test("Should open all the modals & close them by top button", async t => {
    await navigateToRescanPage();

    let modalTopCloseButton;

    for (let link of modalLinkList) {
        await t.click(link);

        modalTopCloseButton = Selector("div.modal-content")
            .find("div.modal-header")
            .find("button");

        await t.expect(modalTopCloseButton.with({visibilityCheck: true}).exists).ok();
        await t.click(modalTopCloseButton);
        await t.expect(modalTopCloseButton.with({visibilityCheck: false}).exists).ok();
    }
});

test("Should open all the modals & close them by button in the footer", async t => {
    await navigateToRescanPage();

    let modalBottomCloseButton;

    for (let link of modalLinkList) {
        await t.click(link);

        modalBottomCloseButton = ReactSelector("SlideOutMessageDialog").findReact("Button");

        await t.expect(modalBottomCloseButton.exists).ok();
        await t.click(modalBottomCloseButton);
        await t.expect(modalBottomCloseButton.with({visibilityCheck: false}).exists).ok();
    }
});

test("Should redirect to Search page", async t => {
    await navigateToRescanPage();

    const rescanButton = ReactSelector("Button");
    const searchPage = ReactSelector("SearchPage");

    await t.click(rescanButton);
    await t.expect(searchPage.exists).ok();
});

test("Should close the alert", async t => {
    await navigateToRescanPage();

    const alert = ReactSelector("Alert");

    await t.expect(alert.exists).ok();
    await t.click(alert);
    await t.expect(alert.exists).notOk();
});
