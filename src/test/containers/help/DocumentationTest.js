import React from "react";
import Documentation from "../../../app/containers/help/documentation";
import t from '../../../app/locales/translation';

describe("Documentation help container tests", () => {
    it("Should render Documentation page", () => {
        const wrapper = shallow(<Documentation />);
        expect(wrapper.find('#logShow')).to.have.lengthOf(1);
        expect(wrapper.find('#captionLog').text()).to.equal(t.TAB_DOCUMENTATION);
    });
});