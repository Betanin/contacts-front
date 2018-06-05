import React from 'react';
import configureStore from 'redux-mock-store';
//import toJson from 'enzyme-to-json';
import enzymeHelper from '../../../helpers/enzyme';
import Login from './Login';

require('chai').should();

function findAction(actions, type, field, payload) {
    return actions.some(item => {
        let result = item.type === type;
        if (field) result = result && item.meta.field === field;
        if (payload) result = result && item.payload === payload;
        return result;
    });
}

describe('<Login />', () => {

    const mockStore = configureStore();
    const enzyme = enzymeHelper();

    it('should render without crash', () => {
        const initialState = {};
        const store = mockStore(initialState);
        enzyme.shallow(<Login store={store} />);
    });

    it('matches saved snapshot', () => {
        const initialState = {
            login: {}
        };
        const store = mockStore(initialState);
        const wrapper = enzyme.mount(<Login />, store);
        //expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has inputs', () => {
        const store = mockStore({});
        const wrapper = enzyme.mount(<Login />, store);
        wrapper.find('input').some('[name="email"]').should.be.true;
        wrapper.find('input').some('[name="password"]').should.be.true;
    })

    it('sends data', () => {
        const store = mockStore({});
        const wrapper = enzyme.mount(<Login />, store);
        wrapper.find('input [name="email"]').simulate('change', { target: { value: 'e@mail.com' } });
        wrapper.find('input [name="password"]').simulate('change', { target: { value: '12345678' } });
        wrapper.find('button [name="login"]').simulate('click');
        wrapper.find('form').simulate('submit');

        const actions = store.getActions();
        const emailAction = findAction(actions, '@@redux-form/CHANGE', 'email', 'e@mail.com');
        emailAction.should.not.be.undefined;
        const passwordAction = findAction(actions, '@@redux-form/CHANGE', 'password', '12345678');
        passwordAction.should.not.be.undefined;
        const submitAction = findAction(actions, '@@redux-form/SET_SUBMIT_SUCCEEDED');
        submitAction.should.not.be.undefined;

    })

})