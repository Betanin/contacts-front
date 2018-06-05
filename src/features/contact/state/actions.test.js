import actions from './actions';
import constants from './constants';
require('chai').should(); 

describe('contact actions', () => {

    it('builds init', () => {

        actions.init(true).should.be.deep.equals({
            type: constants.INIT,
            payload: {
                clearData: true,
            }
        });

    });

    it('builds load', () => {

        const payload = {
            id: '5aca7fb03381b71a63011612',
            name: 'John Doe',
            company: 'John Doe SA',
            email: 'mail@mail.com',
            phone: '5555-5555',
        };
        
        actions.load(...Object.values(payload)).should.be.deep.equals({
            type: constants.LOAD,
            payload: {
                id: '5aca7fb03381b71a63011612',
                name: 'John Doe',
                company: 'John Doe SA',
                email: 'mail@mail.com',
                phone: '5555-5555',                    
            }
        });

    });    

    it('builds get', () => {

        actions.get('5aca7fb03381b71a63011612').should.be.deep.equals({
            type: constants.GET,
            payload: {
                id: '5aca7fb03381b71a63011612',
            }
        });

    });    

    it('builds post', () => {

        const values = {
            a: 'a',
            b: 'b',
        };
        actions.post(values).should.be.deep.equals({
            type: constants.POST,
            payload: {
                values,
            }
        });

    });

    it('builds put', () => {

        const id = '5aca7fb03381b71a63011612';
        const values = {
            a: 'a',
            b: 'b',
        };
        actions.put(id, values).should.be.deep.equals({
            type: constants.PUT,
            payload: {
                id,
                values,
            }
        });

    });

    it('builds cancel', () => {

        actions.cancel().should.be.deep.equals({
            type: constants.CANCEL,
            payload: undefined,
        });

    });

    it('builds remove', () => {

        const id = '5aca7fb03381b71a63011612';
        actions.remove(id).should.be.deep.equals({
            type: constants.REMOVE,
            payload: {
                id,
            }
        });

    });    
    
});