require('chai').should();
import reducer from './reducer';
import constants from './constants';

describe('message reducer', () => {

    it('adds messages', () => {

        let action = {
            type: constants.SHOW,
            payload: {
                id: '123456789',
                type: 'INFO',
                message: 'Test'
            }
        };

        let state = reducer(undefined, action);

        state.should.have.lengthOf(1);

        state = reducer(state, action);

        state.should.have.lengthOf(2);
       
    });

    it('hides messages', () => {

        let previousState = [
            {
                id: '123456789',
                type: 'INFO',
                message: 'Test One'
            },
            {
                id: '987654321',
                type: 'ERROR',
                message: 'Test Two'
            }
        ]

        let action = {
            type: constants.HIDE,
            payload: {
                id: '123456789'
            }
        };

        let state = reducer(previousState, action);

        state.should.have.lengthOf(1);

        state[0].should.include({ id: '987654321' });
       
    });
        
    it('keeps the state at non managed actions', () => {

        let previousState = [
            {
                id: '123456789',
                type: 'INFO',
                message: 'Test One'
            },
            {
                id: '987654321',
                type: 'ERROR',
                message: 'Test Two'
            }
        ];

        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('array')
            .and.have.lengthOf(2);

    });

});