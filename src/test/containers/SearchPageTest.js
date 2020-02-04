import React from "react";
import SearchPage from "../../app/containers/SearchPage";
import AppHeader from "../../app/components/AppHeader";
import ButtonOutline from "../../app/components/ButtonOutline";
import env from "../../app_environment";
import t from "../../app/locales/translation";
import {Redirect, MemoryRouter} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import testData from "../TestData";

const MILLISECONDS_DELAY = env.SEARCH_DELAY * 1000;

const emptyMessage = {storages: []};

describe("SearchPage container tests", () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    before(() => {
        localStorage.setItem("message", JSON.stringify(testData, "", 4));
    });

    it("Should render whole search page", () => {
        const wrapper = shallow(<SearchPage />);

        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find(".search-title").text()).to.equal(t.SEARCH);
        expect(wrapper.find(ButtonOutline)).to.have.lengthOf(1);
        expect(wrapper.find(ProgressBar)).to.have.lengthOf(1);
    });

    it("Should redirect to RescanPage by clicking on button", () => {
        const wrapper = shallow(<SearchPage />);

        expect(wrapper.state("redirectToErrorPage")).to.equal(false);
        expect(wrapper.find(Redirect)).to.have.lengthOf(0);

        wrapper.find(ButtonOutline).simulate("click");

        expect(wrapper.state("redirectToErrorPage")).to.equal(true);
        expect(wrapper.find(Redirect).props().to).to.equal("/error");
    });

    it("Should redirect to AppliancePage with test data after delay", () => {
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <SearchPage />
            </MemoryRouter>
        );
        let page = wrapper.find(SearchPage);

        expect(page.find(Redirect)).to.have.lengthOf(0);

        clock.tick(MILLISECONDS_DELAY + 50);
        wrapper.update();
        page = wrapper.find(SearchPage);

        expect(page.find(Redirect)).to.have.lengthOf(1);
        expect(page.find(Redirect).props().to).to.equal("/appliances");
    });

    it("Should redirect to RescanPage with no data after delay", () => {
        localStorage.setItem("message", JSON.stringify(emptyMessage, "", 4));
        const wrapper = mount(
            <MemoryRouter keyLength={0}>
                <SearchPage />
            </MemoryRouter>
        );
        let page = wrapper.find(SearchPage);

        expect(page.find(Redirect)).to.have.lengthOf(0);

        clock.tick(MILLISECONDS_DELAY + 50);
        wrapper.update();
        page = wrapper.find(SearchPage);

        expect(page.find(Redirect)).to.have.lengthOf(1);
        expect(page.find(Redirect).props().to).to.equal("/error");
    });
});
