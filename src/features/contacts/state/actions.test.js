import actions from './actions';
import constants from './constants';
require('chai').should();

describe('contacts actions', () => {

    it('builds init', () => {

        actions.init().should.be.deep.equals({
            type: constants.INIT,
            payload: undefined,
        });

    });

    it('builds get all', () => {

        actions.getAll().should.be.deep.equals({
            type: constants.FETCH_ALL,
            payload: undefined,
        });

    });

    it('builds filter contacts', () => {

        const filter = 'name';

        actions.filterContacts(filter).should.be.deep.equals({
            type: constants.APPLY_FILTER,
            payload: {
                filter
            }
        });

    });
    
    it('builds load contacts', () => {

        const contacts = [
            {
                a: 'a',
                b: 'b'
            },
            {
                a: '2',
                b: '3'
            }
        ];

        actions.loadContacts(contacts).should.be.deep.equals({
            type: constants.LOAD_ALL,
            payload: {
                items: [...contacts]
            }
        });

    });
    
    it('builds post contact', () => {

        const contact = {
                a: 'a',
                b: 'b'
            };

        actions.postContact(contact).should.be.deep.equals({
            type: constants.POST,
            payload: {
                values: { ...contact }
            }
        });

    });
    
});