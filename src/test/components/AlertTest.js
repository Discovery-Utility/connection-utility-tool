import React from 'react';
import {assert, expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Alert from '../../app/components/Alert';

const noop = function () {};

describe('Alert component tests', () => {
    const ALERT_TITLE = 'Alert title';
    const ALERT_TEXT = 'Alert text';
    const CUSTOM_CLASS = 'custom-class';

    it('Should render alert without additional classes', () => {
        const wrapper = shallow(<Alert title={ALERT_TITLE} text={ALERT_TEXT} onClick={noop} />);
        expect(wrapper.find('.alert-error')).to.have.lengthOf(1);
        expect(wrapper.find('.alert-img')).to.have.lengthOf(1);
        expect(wrapper.find('.alert-title')).to.have.lengthOf(1);
        expect(wrapper.find('.alert-msg').text()).to.equal(ALERT_TEXT);
        assert.equal(wrapper.find('.alert-error').props().onClick, noop);
    });

    it('Should render alert with additional class', () => {
        const wrapper = shallow(<Alert className={CUSTOM_CLASS} title={ALERT_TITLE} text={ALERT_TEXT} onClick={noop} />);
        expect(wrapper.find(`.${CUSTOM_CLASS}`)).to.have.lengthOf(1);
        expect(wrapper.find('.alert-img')).to.have.lengthOf(1);
        expect(wrapper.find('.alert-title')).to.have.lengthOf(1);
        expect(wrapper.find('.alert-msg').text()).to.equal(ALERT_TEXT);
        assert.equal(wrapper.find('.alert-error').props().onClick, noop);
    });

});