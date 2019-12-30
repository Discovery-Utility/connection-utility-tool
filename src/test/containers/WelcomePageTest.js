import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import WelcomePage from '../../app/containers/WelcomePage';
import AppHeader from '../../app/components/AppHeader';
import SlideOutMessageDialog from '../../app/components/SlideOutMessageDialog';
import Button from '../../app/components/Button';
import {Link, Redirect} from 'react-router-dom';

describe('WelcomePage container tests', () => {
    it('Should render <AppHeader /> component', () => {
        const wrapper = shallow(<WelcomePage />);
        expect(wrapper.find(AppHeader)).to.have.lengthOf(1);
    });

    it('Should render four links to modal', () => {
        const wrapper = shallow(<WelcomePage />);
        expect(wrapper.find('.show-link')).to.have.lengthOf(4);
    });

    // it('Should show slide-out dialogs', () => {
    //     const wrapper = shallow(<WelcomePage />);
    //     expect(wrapper.find(SlideOutMessageDialog)).to.have.lengthOf(1);
    //     wrapper.find('.show-link').at(1).simulate('click');
    //     //wrapper.update();
    //     //expect(wrapper.find('.modal .fade .show')).to.have.lengthOf(1);
    // });

    it('Should render <Redirect /> component by clicking on scan button', () => {
        const wrapper = shallow(<WelcomePage />);
        expect(wrapper.find(Redirect)).to.have.lengthOf(0);
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Redirect)).to.have.lengthOf(1);
    });
});