import React from "react";
import HelpPage from "../../app/containers/HelpPage";
import AppHeader from "../../app/components/AppHeader";
import t from '../../app/locales/translation';
import WtExpect from '../../app/containers/help/whatToExpect';
import Troubleshooting from '../../app/containers/help/troubleshootingTips';
import Docs from '../../app/containers/help/documentation';
import {MemoryRouter} from "react-router-dom";


describe("HelpPage container tests", () => {
    it("Should render 'WTE' tab", () => {
        const wrapper = shallow(<HelpPage />);
        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
        expect(wrapper.find("#logBox")).to.have.lengthOf(1);
        expect(wrapper.state("state")).to.equal('expect');
        expect(wrapper.find("#logSwitch")).to.have.lengthOf(1);
        expect(wrapper.find("#expect").text()).to.equal(t.WHAT_EXPECT);
        expect(wrapper.find(WtExpect)).to.have.lengthOf(1);
    });

    it("Should show troubleshooting tips after click", () => {
        const wrapper = mount(<MemoryRouter keyLength={0}><HelpPage /></MemoryRouter>);
        expect(wrapper.find("#tips").text()).to.equal(t.TAB_TROUBLESHOOT);
        wrapper.find("#tips").simulate('click');
        expect(wrapper.state("state")).to.equal('tips');
        expect(wrapper.find(Troubleshooting)).to.have.lengthOf(1);
        
    });
});
