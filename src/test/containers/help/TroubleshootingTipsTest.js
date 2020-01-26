import React from "react";
import Troubleshooting from "../../../app/containers/help/troubleshootingTips";
import t from '../../../app/locales/translation';

describe("Troubleshooting help container tests", () => {
    it("Should render Troubleshooting page", () => {
        const wrapper = shallow(<Troubleshooting />);
        expect(wrapper.find('#logShow')).to.have.lengthOf(1);
        expect(wrapper.find('#captionLog').text()).to.equal(t.TAB_TROUBLESHOOT);
    });
});