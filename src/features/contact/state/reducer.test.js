import reducer from './reducer';
import constants from './constants';
require('chai').should();

describe('create reducer', () => {

    const previousState = Object.freeze({});

    it('sets email', () => {

        const action = {
            type: constants.LOAD,
            payload: {
                id: '5aca7fb03381b71a63011612',
                name: 'John Doe',
                company: 'John Doe SA',
                email: 'mail@mail.com',
                phone: '5555-5555',
            }
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.contains({
                data: {
                    id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    company: 'John Doe SA',
                    email: 'mail@mail.com',
                    phone: '5555-5555',                    
                }
            });

    });
    
    it('keeps the state at non managed actions', () => {

        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include(previousState);

    });
    
});