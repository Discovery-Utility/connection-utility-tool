import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import AppHeader from '../../app/components/AppHeader';
import {Link, Redirect} from 'react-router-dom';

describe('AppHeader component tests', () => {
    it('Should render logo', () => {
        const wrapper = shallow(<AppHeader />);
        expect(wrapper.find('.logo')).to.have.lengthOf(1);
    });

    it('Should render <Redirect /> component by clicking on logo', () => {
        const wrapper = shallow(<AppHeader />);
        expect(wrapper.find(Redirect)).to.have.lengthOf(0);
        wrapper.find('.logo').simulate('click');
        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
    });

    it('Should render two <Link /> components', () => {
        const wrapper = shallow(<AppHeader />);
        expect(wrapper.find(Link)).to.have.lengthOf(2);
    });
});
