import React from "react";
import RescanPage from "../../app/containers/RescanPage";
import AppHeader from "../../app/components/AppHeader";
import SlideOutMessageDialog from "../../app/components/SlideOutMessageDialog";
import Button from "../../app/components/Button";
import Alert from "../../app/components/Alert";
import t from '../../app/locales/translation';
import {Redirect, MemoryRouter} from "react-router-dom";

// Pretty similar w/ WelcomePageTest (as long as the pages is similar)
describe("RescanPage container tests", () => {
    it("Should render <AppHeader /> component", () => {
        const wrapper = shallow(<RescanPage />);
        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
    });

    it("Should render alert", () => {
        const wrapper = shallow(<RescanPage />);
        expect(wrapper.find(Alert)).to.have.lengthOf(1);
    });

    it("Should remove alert after click", () => {
        const wrapper = shallow(<RescanPage />);
        expect(wrapper.find(Alert)).to.have.lengthOf(1);
        expect(wrapper.state("showAlert")).to.equal(true);
        wrapper.find(Alert).simulate('click');
        expect(wrapper.find(Alert)).to.have.lengthOf(0);
        expect(wrapper.state("showAlert")).to.equal(false);
    });

    it("Should render 'rescan' text & four links to modals", () => {
        const wrapper = shallow(<RescanPage />);
        expect(wrapper.find(".rescan-page-title").text()).to.equal(t.ERROR_PAGE_TITLE);
        expect(wrapper.find("p").at(0).text()).to.equal(t.DISABLE_ALL);
        expect(wrapper.find(".show-link")).to.have.lengthOf(4);
    });

    it('Should show "Connect to network" dialog', () => {
        const wrapper = mount(<MemoryRouter keyLength={0}><RescanPage/></MemoryRouter>); 
        const page = wrapper.find(RescanPage);
        page.find('.show-link').at(0).simulate('click');
        expect(page.state("modalTitle")).to.equal(t.CONNECT_LAPTOP);
    });

    it('Should show "Disable wireless network" dialog', () => {
        const wrapper = mount(<MemoryRouter keyLength={0}><RescanPage/></MemoryRouter>); 
        const page = wrapper.find(RescanPage);
        page.find('.show-link').at(1).simulate('click');
        expect(page.state("modalTitle")).to.equal(t.DISABLE_NETWORK);
    });

    it('Should show "Disable firewall" dialog', () => {
        const wrapper = mount(<MemoryRouter keyLength={0}><RescanPage/></MemoryRouter>); 
        const page = wrapper.find(RescanPage);
        page.find('.show-link').at(2).simulate('click');
        expect(page.state("modalTitle")).to.equal(t.DISABLE_FIREWALL);
    });

    it('Should show "Manual discovery" dialog', () => {
        const wrapper = mount(<MemoryRouter keyLength={0}><RescanPage/></MemoryRouter>); 
        const page = wrapper.find(RescanPage);
        page.find('.show-link').at(3).simulate('click');
        expect(page.state("modalTitle")).to.equal(t.BACKUP_DISCOVERY);
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
