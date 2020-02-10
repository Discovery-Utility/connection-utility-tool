import {Selector} from "testcafe";
import {waitForReact, ReactSelector} from "testcafe-react-selectors";
import {navigateToSearchPage} from "./helpers/navigation";

fixture("WelcomePage container tests")
    .page("../src/index.html")
    .beforeEach(async () => {
        await waitForReact();
    });

const modalLinkList = ["#connectToNetwork", "#disableWiFi", "#disableFirewall", "#manualDiscovery"];

test("Should open all the modals & close them by top button", async t => {
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
    await navigateToSearchPage();
});
