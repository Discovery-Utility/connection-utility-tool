import React from 'react';
import {assert, expect} from 'chai';
import {shallow} from 'enzyme';
import Button from '../../app/components/Button';

const noop = function () {};

describe('Button component tests', () => {
    const BUTTON_TEXT = 'Button';
    const CUSTOM_CLASS = 'custom-class';

    it('Should render button without additional classes', () => {
        const wrapper = shallow(<Button available={true} text={BUTTON_TEXT} onClick={noop} />);
        expect(wrapper.find('.button')).to.have.lengthOf(1);
        expect(wrapper.find('.button').text()).to.equal(BUTTON_TEXT);
    });

    it('Should render button with additional class', () => {
        const wrapper = shallow(<Button className={CUSTOM_CLASS} available={true} text={BUTTON_TEXT} onClick={noop} />);
        expect(wrapper.find(`.${CUSTOM_CLASS}`)).to.have.lengthOf(1);
        expect(wrapper.find('.button').text()).to.equal(BUTTON_TEXT);
    });

    it('Should be disable while prop available is false', () => {
        const wrapper = shallow(<Button available={false} text={BUTTON_TEXT} onClick={noop} />);
        expect(wrapper.find('.disable')).to.have.lengthOf(1);
        assert.equal(wrapper.find('.disable').props().onClick, null);
    });

    it('Should be available while prop available is true', () => {
        const wrapper = shallow(<Button available={true} text={BUTTON_TEXT} onClick={noop} />);
        expect(wrapper.find('.disable')).to.have.lengthOf(0);
        assert.equal(wrapper.find('.button').props().onClick, noop);
    });

});
