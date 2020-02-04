import React from "react";
import AppHeader from "../../app/components/AppHeader";
import {appTitle} from "../../app/locales/translation";
import {Link, Redirect} from "react-router-dom";

describe("AppHeader component tests", () => {
    it("Should render logo & name", () => {
        const wrapper = shallow(<AppHeader />);

        expect(wrapper.find(".logo")).to.have.lengthOf(1);
        expect(wrapper.find("#appTitle").text()).to.equal(appTitle);
    });

    it("Should render two <Link /> components", () => {
        const wrapper = shallow(<AppHeader />);
        expect(wrapper.find(Link)).to.have.lengthOf(2);
    });

    it("Should render <Redirect /> component by clicking on logo", () => {
        const wrapper = shallow(<AppHeader />);

        expect(wrapper.state("redirectToWelcomePage")).to.equal(false);

        wrapper.find(".logo").simulate("click");

        expect(wrapper.state("redirectToWelcomePage")).to.equal(true);
        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
    });
});
