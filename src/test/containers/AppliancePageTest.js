import React from "react";
import AppliancePage from "../../app/containers/AppliancesPage";
import AppHeader from "../../app/components/AppHeader";
import t from "../../app/locales/translation";
import {Redirect, MemoryRouter} from "react-router-dom";
import testData from "../TestData";
import Appliance from "../../app/components/Appliance";

describe("AppliancePage container tests", () => {
    before(() => {
        localStorage.setItem("message", JSON.stringify(testData, "", 4));
    });

    it("Should render whole AppliancePage with demoData", () => {
        const wrapper = shallow(<AppliancePage />);

        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find(".available-appliances-title").text()).to.equal(t.APPLIANCES);
        expect(wrapper.find("#AppliancePage_rescanButton").text()).to.equal(t.SCAN_AGAIN.toUpperCase());
        expect(wrapper.find("#Pagination_pageButtonUnconfigured")).to.have.lengthOf(1);
        expect(wrapper.find("#Pagination_pageButtonConfigured")).to.have.lengthOf(1);
        expect(wrapper.find(".appliances-list")).to.have.lengthOf(1);
        expect(wrapper.find(".page-selector")).to.have.lengthOf(1);
    });

    it("Should rescan appliances by clicking on button", () => {
        const wrapper = shallow(<AppliancePage />);

        expect(wrapper.state("redirectToSearch")).to.equal(false);

        wrapper.find("#AppliancePage_rescanButton").simulate("click");

        expect(wrapper.state("redirectToSearch")).to.equal(true);
        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
    });

    it("Should change pages from unconfigured to configured and vice versa", () => {
        const wrapper = shallow(<AppliancePage />);

        expect(wrapper.state("pageStateUnconfigured")).to.equal(true);

        wrapper.find("#Pagination_pageButtonConfigured").simulate("click");

        expect(wrapper.state("pageStateUnconfigured")).to.equal(false);

        wrapper.find("#Pagination_pageButtonUnconfigured").simulate("click");

        expect(wrapper.state("pageStateUnconfigured")).to.equal(true);
    });

    it("Should change the number of a page", () => {
        const wrapper = shallow(<AppliancePage />);

        expect(wrapper.find("#paginationButton")).to.have.lengthOf(2);
        expect(wrapper.state("showPagination")).to.equal(true);
        expect(wrapper.state("currentPage")).to.equal(0);

        wrapper
            .find("#paginationButton")
            .at(1)
            .simulate("click");

        expect(wrapper.state("currentPage")).to.equal(1);
    });

    it("Should update a list of selected appliances", () => {
        // mount() build all the children (need that for render Appliance card),
        // so it needs MemoryRouter's workaround for <Router /> element inside
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>,
            {attachTo: document.body}
        );
        let page = wrapper.find(AppliancePage);
        const firstAppliance = page.find(Appliance).at(0);
        const secondAppliance = page.find(Appliance).at(1);

        const appliances = testData.storages.filter(appliance => !appliance.cluster);

        expect(page.state("selectedNames")).to.deep.equal([]);

        firstAppliance.find("input").simulate("click");

        expect(page.state("selectedNames")).to.deep.equal([appliances[0].name]);

        secondAppliance.find("input").simulate("click");

        expect(page.state("selectedNames")).to.deep.equal([appliances[0].name, appliances[1].name]);

        firstAppliance.find("input").simulate("click");

        expect(page.state("selectedNames")).to.deep.equal([appliances[1].name]);
    });

    it("Should update a list of selected clusters", () => {
        // mount() build all the children (need that for render Appliance card),
        // so it needs MemoryRouter's workaround for <Router /> element inside
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>
        );
        wrapper.find("#Pagination_pageButtonConfigured").simulate("click");
        wrapper.update();

        let page = wrapper.find(AppliancePage);
        const firstCluster = page.find(Appliance).at(0);
        const secondCluster = page.find(Appliance).at(1);

        const clusters = testData.storages.filter(appliance => appliance.cluster);

        expect(page.state("selectedNames")).to.deep.equal([]);

        firstCluster.find("input").simulate("click");

        expect(page.state("selectedNames")).to.deep.equal([clusters[0].name]);

        secondCluster.find("input").simulate("click");

        expect(page.state("selectedNames")).to.deep.equal([clusters[1].name]);
    });

    it('Should show "Create Cluster" popup', () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>
        );
        let page = wrapper.find(AppliancePage);
        const firstAppliance = page.find(Appliance).at(0);

        expect(page.find("#CreateCluster_popup")).to.have.lengthOf(0);

        firstAppliance.find("input").simulate("click");

        wrapper.update();
        page = wrapper.find(AppliancePage);

        expect(page.find("#CreateCluster_popup")).to.have.lengthOf(1);
    });

    it("Should show 'Create Cluster' screen", () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>
        );
        let page = wrapper.find(AppliancePage);
        const firstAppliance = page.find(Appliance).at(0);

        expect(page.find(".create-cluster-screen")).to.have.lengthOf(0);

        firstAppliance.find("input").simulate("click");

        wrapper.update();
        page = wrapper.find(AppliancePage);
        page.find("#CreateCluster_popupButton").simulate("click");

        wrapper.update();
        page = wrapper.find(AppliancePage);

        expect(page.find(".create-cluster-screen")).to.have.lengthOf(1);
        expect(
            page
                .find(".create-cluster-screen-title")
                .at(0)
                .text()
        ).to.equal(t.ALMOST_THERE);
    });

    it('Should show "Add to cluster" modal', () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>
        );
        let page = wrapper.find(AppliancePage);
        let firstAppliance = page.find(Appliance).at(1);

        expect(page.find(".modal-title")).to.have.lengthOf(0);

        firstAppliance.find("input").simulate("click");
        wrapper.update();
        page = wrapper.find(AppliancePage);
        firstAppliance = page.find(Appliance).at(1);
        firstAppliance.find(".custom-dropdown-item").simulate("click");

        expect(page.find(".modal-title").text()).to.equal(t.ADD_TO_EXISTING);
        expect(page.find(".slideout-body-text").text()).to.equal(`Selected: ${testData.storages[1].name}`);
    });

    it('Should show "Launch cluster manager" popup', () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <AppliancePage />
            </MemoryRouter>
        );
        let page = wrapper.find(AppliancePage);

        wrapper.find("#Pagination_pageButtonConfigured").simulate("click");
        wrapper.update();
        page = wrapper.find(AppliancePage);
        const cluster = page.find(Appliance).at(0);

        expect(page.find("#CreateCluster_popup")).to.have.lengthOf(0);

        cluster.find("input").simulate("click");

        wrapper.update();
        page = wrapper.find(AppliancePage);

        expect(page.find("#CreateCluster_popupButton")).to.have.lengthOf(1);
    });
});
