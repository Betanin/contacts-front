import actions from './actions';
import constants from './constants';
require('chai').should();

describe('login actions', () => {

    it('builds init', () => {

        actions.init().should.be.deep.equals({
            type: constants.INIT,
            payload: undefined,
        });

    });

    it('builds init session', () => {

        const email = 'mail@mail.com';
        const name = 'John Doe';
        const token = 'asd123456789';
        
        actions.initSession(email, name, token).should.be.deep.equals({
            type: constants.INIT_SESSION,
            payload: {
                email,
                name,
                token,
            }
        });

    });

    it('builds recover session', () => {

        actions.recoverSession(true).should.be.deep.equals({
            type: constants.RECOVER_SESSION,
            payload: {
                redirect: true
            }
        });

        actions.recoverSession(false).should.be.deep.equals({
            type: constants.RECOVER_SESSION,
            payload: {
                redirect: false
            }
        });

    });

    it('builds post', () => {

        const values = {
            a: 'a',
            b: 'b',
        };
        const postLoginOperations = [
            () => 'x',
            () => 'y',
        ]
        actions.login(values, ...postLoginOperations).should.be.deep.equals({
            type: constants.LOGIN,
            payload: {
                values,
                postLoginOperations
            }
        });

    });

    it('builds signup', () => {

        const preSignupOperations = [
            () => 'x',
            () => 'y',
        ]
        actions.signup(...preSignupOperations).should.be.deep.equals({
            type: constants.SIGNUP,
            payload: {
                preSignupOperations
            }
        });

    });

    
});