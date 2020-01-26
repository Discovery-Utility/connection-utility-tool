import React from "react";
import SearchPage from "../../app/containers/SearchPage";
import AppHeader from "../../app/components/AppHeader";
import ButtonOutline from "../../app/components/ButtonOutline";
import env from "../../app_environment";
import t from '../../app/locales/translation';
import {Redirect, MemoryRouter} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const COUNT_SECONDS = env.SEARCH_DELAY;

// TODO: find how to mock localStorage

const messageWithAppliance = `{
    "storages": [
        {
            "link": "http://192.168.0.100:8080",
            "name": "FNM00103198723",
            "state": "unconfigured",
            "type": "HCI",
            "model": "ProductName 1000X",
            "cluster": "false",
            "failed": "false"
        } 
    ]
}`

const emptyMessage = `{"storages": [{}]}` 


describe("SearchPage container tests", () => {

    // beforeEach(() => {
    //     localStorage.setItem("message", messageWithAppliance);
    // });

    localStorage.setItem("message", messageWithAppliance);

    it('Should render whole search page', () => {
        const wrapper = shallow(<SearchPage />);
        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find('.search-title').text()).to.equal(t.SEARCH);
        expect(wrapper.find('p').at(0).text()).to.equal(t.SEARCH_HELP);
        expect(wrapper.find(ButtonOutline)).to.have.lengthOf(1);
        expect(wrapper.find(ProgressBar)).to.have.lengthOf(1);
    });

    it("Should redirect to RescanPage by clicking on button", () => {
        const wrapper = shallow(<SearchPage />);
        expect(wrapper.state("redirectToErrorPage")).to.equal(false);
        wrapper.find(ButtonOutline).simulate('click');
        expect(wrapper.state("redirectToErrorPage")).to.equal(true);
    });

    // it("Should redirect to AppliancePage", () => {
    //     const wrapper = mount(<MemoryRouter keyLength={0}><SearchPage/></MemoryRouter>);
    //     //setTimeout(() => {expect(wrapper.find(SearchPage).props().location.pathname).toBe('/appliance')}, COUNT_SECONDS+1);
    // });

    // test redirect to appliances page (mock storage)
    
    // test redirect to rescan page (mock empty storage)


});
