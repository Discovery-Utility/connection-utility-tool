import React from "react";
import ButtonOutline from "../../app/components/ButtonOutline";

const noop = function() {};

describe("Button component tests", () => {
    const BUTTON_TEXT = "Button";

    it("Should render outline button", () => {
        const wrapper = shallow(<ButtonOutline text={BUTTON_TEXT} onClick={noop} />);

        expect(wrapper.find(".button-outline")).to.have.lengthOf(1);
        expect(wrapper.find(".button-outline").text()).to.equal(BUTTON_TEXT);
        assert.equal(wrapper.find(".button-outline").props().onClick, noop);
    });

    it("Should call onClick function", () => {
        const clickCallback = sinon.spy();
        const wrapper = shallow(<ButtonOutline text={BUTTON_TEXT} onClick={clickCallback} />);

        wrapper.find(".button-outline").simulate("click");

        sinon.assert.called(clickCallback);
    });
});
