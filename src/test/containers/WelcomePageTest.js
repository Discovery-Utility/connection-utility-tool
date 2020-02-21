import React from "react";
import WelcomePage from "../../app/containers/WelcomePage";
import AppHeader from "../../app/components/AppHeader";
import Button from "../../app/components/Button";
import t from "../../app/locales/translation";
import {Redirect} from "react-router-dom";

describe("WelcomePage container tests", () => {
    it("Should render AppHeader, 'welcome' text & four links to modals", () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find(".welcome-page-title").text()).to.equal(t.WELCOME_TITLE);
        expect(wrapper.find(".welcome-page-text").text()).to.equal(t.ABOUT_TOOL);
        expect(wrapper.find(".show-link")).to.have.lengthOf(4);
    });

    it('Should show "Connect to network" dialog', () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_connectToNetwork").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.CONNECT_LAPTOP);
    });

    it('Should show "Disable wireless network" dialog', () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_disableWiFi").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.DISABLE_NETWORK);
    });

    it('Should show "Disable firewall" dialog', () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_disableFirewall").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.DISABLE_FIREWALL);
    });

    it('Should show "Manual discovery" dialog', () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.state("modalTitle")).to.equal(null);

        wrapper.find("#ShowLink_manualDiscovery").simulate("click");

        expect(wrapper.state("modalTitle")).to.equal(t.BACKUP_DISCOVERY);
    });

    it("Should render <Redirect /> component by clicking on scan button", () => {
        const wrapper = shallow(<WelcomePage />);

        expect(wrapper.find(Redirect)).to.have.lengthOf(0);
        expect(wrapper.state("redirectToSearch")).to.equal(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
        expect(wrapper.state("redirectToSearch")).to.equal(true);
    });
});
