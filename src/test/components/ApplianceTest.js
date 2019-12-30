import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
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

const DEMO_APPLIANCE_WITH_WARNING = {
    link: "http://192.168.0.100:8080",
    name: "FNM00103198723",
    state: "unconfigured",
    type: "HCI",
    model: "ProductName 1000X",
    cluster: "false",
    failed: "true"
}

const DEMO_CLUSTER = {
    link: "https://10.248.178.162",
    name: "ClusterSample",
    state: "configured",
    model: "ProductName 1000",
    type: "BM",
    cluster: "true",
    failed: "false"
}

const noop = function () {};


describe('Appliance component tests', () => {
    it('Should render appliance with checkbox', () => {
        const wrapper = shallow(<Appliance appliance={DEMO_APPLIANCE} selectTypeCheckbox={true} showSettingsMenu={true} active={false}/>);
        expect(wrapper.find('.appliance')).to.have.lengthOf(1);
        expect(wrapper.find('.container-check')).to.have.lengthOf(1);
        expect(wrapper.find('.app-name').text()).to.equal(DEMO_APPLIANCE.name);
        expect(wrapper.find('.app-model').text()).to.equal(DEMO_APPLIANCE.model);
        expect(wrapper.find('.app-failed-false')).to.have.lengthOf(1);
        expect(wrapper.find('.custom-dropdown')).to.have.lengthOf(1);
    });

    it('Should render appliance with radio checkmark', () => {
        const wrapper = shallow(<Appliance appliance={DEMO_CLUSTER} selectTypeCheckbox={false} showSettingsMenu={false} active={false}/>);
        expect(wrapper.find('.appliance')).to.have.lengthOf(1);
        expect(wrapper.find('.radio-button')).to.have.lengthOf(1);
        expect(wrapper.find('.app-name').text()).to.equal(DEMO_CLUSTER.name);
        expect(wrapper.find('.app-model').text()).to.equal(DEMO_CLUSTER.model);
        expect(wrapper.find('.app-failed-false')).to.have.lengthOf(1);
        expect(wrapper.find('.custom-dropdown')).to.have.lengthOf(0);
    });

    it('Should render warning image on failed appliance', () => {
        const wrapper = shallow(<Appliance appliance={DEMO_APPLIANCE_WITH_WARNING} selectTypeCheckbox={true} showSettingsMenu={true} active={false}/>);
        expect(wrapper.find('.app-failed-true')).to.have.lengthOf(1);
    });

    // it('Should call onClick when its clicked on checkbox', () => {
    //     let sandbox = sinon.createSandbox();
    //     const checkboxProps = {onClick: noop};
    //     const mockProps = sandbox.mock(checkboxProps);
    //     mockProps.expects('onClick').once();
    //     const wrapper = shallow(<Appliance addSelection={checkboxProps} removeSelection={checkboxProps} appliance={DEMO_APPLIANCE} selectTypeCheckbox={true} showSettingsMenu={true} active={false}/>);
    //     const checkbox = wrapper.find('input');
    //     checkbox.simulate('click');
    //     sandbox.verify();
    // });


});
