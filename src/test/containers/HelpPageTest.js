import React from "react";
import HelpPage from "../../app/containers/HelpPage";
import AppHeader from "../../app/components/AppHeader";
import t from "../../app/locales/translation";
import WtExpect from "../../app/containers/help/whatToExpect";
import Troubleshooting from "../../app/containers/help/troubleshootingTips";
import Docs from "../../app/containers/help/documentation";
import {MemoryRouter} from "react-router-dom";

describe("HelpPage container tests", () => {
    it("Should render 'WTE' tab", () => {
        const wrapper = shallow(<HelpPage />);

        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.state("tab")).to.equal("expect");
        expect(wrapper.find("#logBox")).to.have.lengthOf(1);
        expect(wrapper.find("#logSwitch")).to.have.lengthOf(1);
        expect(wrapper.find("#expect").text()).to.equal(t.WHAT_EXPECT);
        expect(wrapper.find(WtExpect)).to.have.lengthOf(1);
    });

    it("Should show troubleshooting tips after click", () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <HelpPage />
            </MemoryRouter>,
            {attachTo: document.body}
        );
        let page = wrapper.find(HelpPage);

        expect(page.find("#tips").text()).to.equal(t.TAB_TROUBLESHOOT);

        page.find("#tips").simulate("click");
        wrapper.update();
        page = wrapper.find(HelpPage);

        expect(page.state("tab")).to.equal("tips");
        expect(page.find(Troubleshooting)).to.have.lengthOf(1);
    });

    it("Should show docs after click", () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <HelpPage />
            </MemoryRouter>,
            {attachTo: document.body}
        );
        let page = wrapper.find(HelpPage);

        expect(page.find("#docs").text()).to.equal(t.TAB_DOCUMENTATION);

        page.find("#docs").simulate("click");
        wrapper.update();
        page = wrapper.find(HelpPage);

        expect(page.state("tab")).to.equal("docs");
        expect(page.find(Docs)).to.have.lengthOf(1);
    });
});
