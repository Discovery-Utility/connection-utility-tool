import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import SlideOutDialog from '../../app/components/SlideOutDialog';
import Appliance from '../../app/components/Appliance';

const DEMO_APPLIANCE = {
    link: "http://192.168.0.100:8080",
    name: "FNM00103198723",
    state: "unconfigured",
    type: "HCI",
    model: "ProductName 1000X",
    cluster: "false",
    failed: "false"
}

const DEMO_CLUSTER = [
    {
        id: 0,
        link: "https://10.248.178.162",
        name: "ClusterSample",
        state: "configured",
        model: "ProductName 1000",
        type: "BM",
        cluster: "true",
        failed: "false"
    },
    {
        id: 1,
        link: "http://192.168.6.47:8080",
        name: "MainCluster",
        state: "configured",
        model: "ProductName 1000",
        type: "BM",
        cluster: "true",
        failed: "false"
    }
]

const noop = function () {};

describe('SlideOutDialog component tests', () => {
    it('Should render dialog with proper appliances', () => {
        const wrapper = shallow(<SlideOutDialog configured={DEMO_CLUSTER} selectedAppliance={DEMO_APPLIANCE} />);
        expect(wrapper.find('#modal')).to.have.lengthOf(1);
        expect(wrapper.find('.slideout-body-text').text()).to.equal(`Selected: ${DEMO_APPLIANCE.name}`);
        expect(wrapper.find(Appliance)).to.have.lengthOf(2);
    });

    it('Should close dialog by clicking on "x" button', () => {
        // TODO
    });

    it('Should close dialog by clicking on "OK" button', () => {
        // TODO
    });
});
