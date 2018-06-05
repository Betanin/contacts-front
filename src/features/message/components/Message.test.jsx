import React from 'react';
import configureStore from 'redux-mock-store';
import enzymeHelper from '../../../helpers/enzyme';
import Message from './Message';

require('chai').should();

describe('<Message />', () => {

    const mockStore = configureStore();
    const enzyme = enzymeHelper();

    it('should render without crash', () => {
        const initialState = {
            messages: [],
        };
        const store = mockStore(initialState);
        enzyme.shallow(<Message store={store} />);
    });

    it('should render 2 messages', () => {
        const initialState = {
            messages: [{
                type: 'INFO',
                message: 'Test info',
            },{
                type: 'ERROR',
                message: 'Test error',
            }],
        };
        const store = mockStore(initialState);
        const wrapper = enzyme.mount(<Message/>, store);
        wrapper.find('#message0 > p').text().should.be.equals('Test info');
        wrapper.find('#message1 > p').text().should.be.equals('Test error');
    });
    
    it('should not render', () => {
        const initialState = {
            messages: [],
        };
        const store = mockStore(initialState);
        const wrapper = enzyme.mount(<Message/>, store);
        wrapper.find('.invisible').should.be.an('object');
    });
    
})