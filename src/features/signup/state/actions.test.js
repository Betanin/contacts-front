import actions from './actions';
import constants from './constants';
require('chai').should();

describe('signup actions', () => {

    it('builds init', () => {

        actions.init().should.be.deep.equals({
            type: constants.INIT,
            payload: undefined,
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

    it('builds cancel', () => {

        actions.cancel().should.be.deep.equals({
            type: constants.CANCEL,
            payload: undefined,
        });

    });

    
});