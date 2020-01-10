import React from "react";
import Appliance from "../../app/components/Appliance";

const DEMO_APPLIANCE = {
    link: "http://192.168.0.100:8080",
    name: "FNM00103198723",
    state: "unconfigured",
    type: "HCI",
    model: "ProductName 1000X",
    cluster: "false",
    failed: "false"
};

const DEMO_APPLIANCE_WITH_WARNING = {
    link: "http://192.168.0.100:8080",
    name: "FNM00103198723",
    state: "unconfigured",
    type: "HCI",
    model: "ProductName 1000X",
    cluster: "false",
    failed: "true"
};

const DEMO_CLUSTER = {
    link: "https://10.248.178.162",
    name: "ClusterSample",
    state: "configured",
    model: "ProductName 1000",
    type: "BM",
    cluster: "true",
    failed: "false"
};

describe("Appliance component tests", () => {
    it("Should render appliance with checkbox", () => {
        const wrapper = shallow(<Appliance appliance={DEMO_APPLIANCE} selectTypeCheckbox={true} showSettingsMenu={true} active={false} />);
        expect(wrapper.find(".appliance")).to.have.lengthOf(1);
        expect(wrapper.find(".container-check")).to.have.lengthOf(1);
        expect(wrapper.find(".app-name").text()).to.equal(DEMO_APPLIANCE.name);
        expect(wrapper.find(".app-model").text()).to.equal(DEMO_APPLIANCE.model);
        expect(wrapper.find(".app-failed-false")).to.have.lengthOf(1);
        expect(wrapper.find(".custom-dropdown")).to.have.lengthOf(1);
    });

    it("Should render appliance with radio checkmark", () => {
        const wrapper = shallow(<Appliance appliance={DEMO_CLUSTER} selectTypeCheckbox={false} showSettingsMenu={false} active={false} />);
        expect(wrapper.find(".appliance")).to.have.lengthOf(1);
        expect(wrapper.find(".radio-button")).to.have.lengthOf(1);
        expect(wrapper.find(".app-name").text()).to.equal(DEMO_CLUSTER.name);
        expect(wrapper.find(".app-model").text()).to.equal(DEMO_CLUSTER.model);
        expect(wrapper.find(".app-failed-false")).to.have.lengthOf(1);
        expect(wrapper.find(".custom-dropdown")).to.have.lengthOf(0);
    });

    it("Should render warning image on failed appliance", () => {
        const wrapper = shallow(
            <Appliance appliance={DEMO_APPLIANCE_WITH_WARNING} selectTypeCheckbox={true} showSettingsMenu={true} active={false} />
        );
        expect(wrapper.find(".app-failed-true")).to.have.lengthOf(1);
    });

    it('Should set checkbox to active & call "addSelection" after click', () => {
        const addCallback = sinon.spy();
        const wrapper = shallow(
            <Appliance appliance={DEMO_APPLIANCE} active={false} selectTypeCheckbox={true} addSelection={addCallback} />
        );
        expect(wrapper.state("checked")).to.equal(false);
        wrapper.find("span").simulate("click");
        sinon.assert.called(addCallback);
        expect(wrapper.state("checked")).to.equal(true);
    });

    it('Should set checkbox to inactive call "removeSelection" after click', () => {
        const removeCallback = sinon.spy();
        const wrapper = shallow(
            <Appliance appliance={DEMO_APPLIANCE} active={true} selectTypeCheckbox={true} removeSelection={removeCallback} />
        );
        expect(wrapper.state("checked")).to.equal(true);
        wrapper.find("span").simulate("click");
        sinon.assert.called(removeCallback);
        expect(wrapper.state("checked")).to.equal(false);
    });

    it('Should set radiobutton to active & call "addSelection" after click', () => {
        const addCallback = sinon.spy();
        const wrapper = shallow(
            <Appliance appliance={DEMO_CLUSTER} active={false} selectTypeCheckbox={false} addSelection={addCallback} />
        );
        expect(wrapper.state("checked")).to.equal(false);
        wrapper.find("input").simulate("click");
        sinon.assert.called(addCallback);
    });

    it('Should let radiobutton be active & call "addSelection" after clicking on already active button', () => {
        const addCallback = sinon.spy();
        const wrapper = shallow(<Appliance appliance={DEMO_CLUSTER} active={true} selectTypeCheckbox={false} addSelection={addCallback} />);
        expect(wrapper.state("checked")).to.equal(true);
        wrapper.find("input").simulate("click");
        sinon.assert.called(addCallback);
    });
});
