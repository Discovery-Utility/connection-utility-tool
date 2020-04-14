import React from "react";
import RescanPage from "../../app/containers/RescanPage";
import AppHeader from "../../app/components/AppHeader";
import Button from "../../app/components/Button";
import Alert from "../../app/components/Alert";
import t from "../../app/locales/translation";
import {Redirect} from "react-router-dom";

// Pretty similar w/ WelcomePageTest (as long as the pages is similar)
describe("RescanPage container tests", () => {
    it("Should render AppHeader, alert, 'rescan' text & four links to modals", () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find(Alert)).to.have.lengthOf(1);
        expect(wrapper.find(".rescan-page-title").text()).to.equal(t.ERROR_PAGE_TITLE);
        expect(wrapper.find(".show-link")).to.have.lengthOf(4);
    });

    it("Should remove alert after click", () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.find(Alert)).to.have.lengthOf(1);
        expect(wrapper.state("showAlert")).to.equal(true);

        wrapper.find(Alert).simulate("click");

        expect(wrapper.find(Alert)).to.have.lengthOf(0);
        expect(wrapper.state("showAlert")).to.equal(false);
    });

    it('Should show "Connect to network" dialog', () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_connectToNetwork").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.CONNECT_LAPTOP);
    });

    it('Should show "Disable wireless network" dialog', () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_disableWiFi").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.DISABLE_NETWORK);
    });

    it('Should show "Disable firewall" dialog', () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_disableFirewall").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.DISABLE_FIREWALL);
    });

    it('Should show "Manual discovery" dialog', () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_manualDiscovery").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.BACKUP_DISCOVERY);
    });

    it("Should render <Redirect /> component by clicking on scan button", () => {
        const wrapper = shallow(<RescanPage />);

        expect(wrapper.find(Redirect)).to.have.lengthOf(0);
        expect(wrapper.state("redirectToSearch")).to.equal(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
        expect(wrapper.state("redirectToSearch")).to.equal(true);
    });
});
