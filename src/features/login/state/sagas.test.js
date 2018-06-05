import sagas from './sagas';
import constants from './constants';
import actions from './actions';
import sagaHelper from 'redux-saga-testing';
import { push } from '../../../common/router/actions';
import { call } from 'redux-saga/effects';
import { messageActions } from '../../message';
import { contactsActions } from '../../contacts';
import { signupActions } from '../../signup';
import { runSagasTests } from '../../../helpers/tests';
require('chai').should();

describe('login sagas', () => {

    const tests = [];

    tests.push({
        name: 'init',
        effect: constants.INIT,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());
            it('redirects to the feature root', result => {
                result.PUT.action.should.be.deep.equals(push('/login'));
            });
        }
    });

    tests.push({
        name: 'signup',
        effect: constants.SIGNUP,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());
            it('redirects to the signup root', result => {
                result.PUT.action.should.be.deep.equals(signupActions.init());
            });
        }
    });

    tests.push({
        name: 'recover session success',
        effect: constants.RECOVER_SESSION,
        fn: (sagaGenerator) => {
            const token = '123456789123456789';
            const it = sagaHelper(sagaGenerator());

            it('calls getJWTToken', result => {
                result.CALL.fn.toString().should.contains('getJWTToken');
                return token;
            });

            it('calls init session', result => {
                result.CALL.fn.toString().should.contains('initSession');
                result.CALL.args.should.contain(token);                
            });
        }
    });

    tests.push({
        name: 'recover without persisted session',
        effect: constants.RECOVER_SESSION,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());

            it('calls getJWTToken', result => {
                result.CALL.fn.toString().should.contains('getJWTToken');
                return undefined;
            });
        }
    });

    tests.push({
        name: 'recover without persisted session redirecting',
        effect: constants.RECOVER_SESSION,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator(true));

            it('calls getJWTToken', result => {
                result.CALL.fn.toString().should.contains('getJWTToken');
                return undefined;
            });

            it('calls init session', result => {
                result.CALL.fn.toString().should.contains('init');
            });
        }
    });

    tests.push({
        name: 'recover error handling',
        effect: constants.RECOVER_SESSION,
        fn: (sagaGenerator) => {
            const token = '123456789123456789';
            const it = sagaHelper(sagaGenerator());

            it('calls getJWTToken', result => {
                result.CALL.fn.toString().should.contains('getJWTToken');
                return token;
            });

            it('fires the error', result => {
                return new Error('Something went wrong');
            });

            it('calls init session', result => {
                result.CALL.fn.toString().should.contains('init');
            });            
        }
    });

    tests.push({
        name: 'login success',
        effect: constants.LOGIN,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    values: {
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                    }
                }
            };
            const response = {
                status: 200,
                data: {
                        token: '5aca7fb03381b71a63011612',
                    }
            };
            const it = sagaHelper(sagaGenerator(request));
   
            it('posts login', result => {
                result.CALL.fn.toString().should.contains('post');
                result.CALL.args.should.deep.contain(request.payload.values);
                return response;
            });

            it('calls the autenticate user function with the parameter provided', result => {
                result.CALL.fn.toString().should.contains('authenticateUser');
                result.CALL.args.should.contain(response.data.token);                
            });

            it('calls init session', result => {
                result.CALL.fn.toString().should.contains('initSession');
                result.CALL.args.should.contain(response.data.token);

                const decodedToken = {
                    data: {
                        email: 'mail@mail.com',
                        name: 'John Doe',   
                    }
                };                
                const sucessMessage = 'Success Message';
                const errorMessage = 'Fail Message';
                let step;

                const initSessionError = result.CALL.fn(response.data.token, sucessMessage, errorMessage);
                initSessionError.next();
                initSessionError.next().value.PUT.action.should.be.deep.equals(messageActions.sendMessage('ERROR', errorMessage));
                initSessionError.next();

                const initSessionSuccess = result.CALL.fn(response.data.token, sucessMessage, errorMessage);
                initSessionSuccess.next();
                initSessionSuccess.next(decodedToken);
                step = initSessionSuccess.next();
                step.value.PUT.action.should.be.deep.equals(messageActions.sendMessage('INFO', sucessMessage));
                step = initSessionSuccess.next();
                step.value.PUT.action.should.be.deep.equals(contactsActions.init());
            });
        }
    });

    tests.push({
        name: 'login fail',
        effect: constants.LOGIN,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    values: {
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                    }
                }
            };
            const response = {
                status: 400,
                data: {
                    error: {
                        message: 'Error test'
                    }
                }
            };
            const it = sagaHelper(sagaGenerator(request));

            it('post contact', result => {
                result.should.be.an('object').and.include({ '@@redux-saga/IO': true });
                Object.keys(result).should.include('CALL');
                return response;
            });

            it('dispatches error message', result => {
                result.PUT.action.type.should.be.equals('MESSAGE/SEND');
                result.PUT.action.payload.type.should.be.equals('ERROR');
            });            
        }
    });

    runSagasTests(sagas, tests);
    
});