import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import SlideOutMessageDialog from '../../app/components/SlideOutMessageDialog';
import Button from '../../app/components/Button';

const noop = function () {};

describe('SlideOutMessageDialog component tests', () => {
    const MODAL_TITLE = 'Modal title';
    const MODAL_TEXT = 'Modal text';

    it('Should render SlideOutMessageDialog', () => {
        const wrapper = shallow(<SlideOutMessageDialog title={MODAL_TITLE} body={MODAL_TEXT} />);
        expect(wrapper.find('#modal')).to.have.lengthOf(1);
        expect(wrapper.find('.modal-title').text()).to.equal(MODAL_TITLE);
        expect(wrapper.find('.modal-body').text()).to.equal(MODAL_TEXT);
        expect(wrapper.find(Button)).to.have.lengthOf(1);
    });

    it('Should close dialog by clicking on "x" button', () => {
        // TODO
    });

    it('Should close dialog by clicking on "OK" button', () => {
        // TODO
    });

});