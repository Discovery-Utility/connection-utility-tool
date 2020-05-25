import React from "react";
import SlideOutDialog from "../../app/components/SlideOutDialog";
import Appliance from "../../app/components/Appliance";

const DEMO_APPLIANCE = {
    link: "http://192.168.0.100:8080",
    name: "FNM00103198723",
    state: "unconfigured",
    type: "BM",
    model: "PowerStore 1000",
    cluster: "false",
    failed: "false"
};

const DEMO_CLUSTER = [
    {
        id: 0,
        link: "https://10.248.178.162",
        name: "ClusterSample",
        state: "configured",
        model: "PowerStore 1000",
        type: "BM",
        cluster: "true",
        failed: "false"
    },
    {
        id: 1,
        link: "http://192.168.6.47:8080",
        name: "MainCluster",
        state: "configured",
        model: "PowerStore 1000",
        type: "BM",
        cluster: "true",
        failed: "false"
    }
];

describe("SlideOutDialog component tests", () => {
    it("Should render dialog with proper appliances", () => {
        const wrapper = shallow(<SlideOutDialog configured={DEMO_CLUSTER} selectedAppliance={DEMO_APPLIANCE} />);

        expect(wrapper.find("#modal")).to.have.lengthOf(1);
        expect(wrapper.find(".slideout-body-text").text()).to.equal(`Selected: ${DEMO_APPLIANCE.name}`);
        expect(wrapper.find(Appliance)).to.have.lengthOf(2);
    });

    it("Should add appliance to selected after click", () => {
        const wrapper = mount(<SlideOutDialog configured={DEMO_CLUSTER} selectedAppliance={DEMO_APPLIANCE} />);
        const appliance = wrapper.find(Appliance).at(0);

        expect(wrapper.state("selectedNames")).to.deep.equal([]);

        appliance.find("input").simulate("click");

        expect(wrapper.state("selectedNames")).to.deep.equal([DEMO_CLUSTER[0].name]);
    });

    it("Should change selected appliance", () => {
        const wrapper = mount(<SlideOutDialog configured={DEMO_CLUSTER} selectedAppliance={DEMO_APPLIANCE} />);
        const firstCluster = wrapper.find(Appliance).at(0);
        const secondCluster = wrapper.find(Appliance).at(1);

        expect(wrapper.state("selectedNames")).to.deep.equal([]);

        firstCluster.find("input").simulate("click");

        expect(wrapper.state("selectedNames")).to.deep.equal([DEMO_CLUSTER[0].name]);

        secondCluster.find("input").simulate("click");

        expect(wrapper.state("selectedNames")).to.deep.equal([DEMO_CLUSTER[1].name]);
    });
});
