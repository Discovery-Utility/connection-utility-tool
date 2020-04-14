import React from "react";
import WtExpect from "../../../app/containers/help/whatToExpect";
import t from "../../../app/locales/translation";

describe("WhatToExpect help container tests", () => {
    it("Should render WTE page", () => {
        const wrapper = shallow(<WtExpect />);
        expect(wrapper.find("#logShow")).to.have.lengthOf(1);
        expect(wrapper.find("#captionLog").text()).to.equal(t.WHAT_EXPECT);
    });
});
