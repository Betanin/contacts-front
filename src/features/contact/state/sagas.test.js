import sagas from './sagas';
import constants from './constants';
import actions from './actions';
import sagaHelper from 'redux-saga-testing';
import { push } from '../../../common/router/actions';
import { contactsActions } from '../../contacts';
import { runSagasTests } from '../../../helpers/tests';
require('chai').should();

describe('contact sagas', () => {

    const tests = [];

    tests.push({
        name: 'init',
        effect: constants.INIT,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());

            it('redirects to the feature root', result => {
                result.PUT.action.should.be.deep.equals(push('/contact'));
            });
        }
    });

    tests.push({
        name: 'init and clear data',
        effect: constants.INIT,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator(actions.init(true)));

            it('dispatches load contact action to clear data', result => {
                result.PUT.action.type.should.be.equals('CONTACT/LOAD');
                result.PUT.action.payload.should.be.deep.equals({
                    id: undefined,
                    name: undefined,
                    company: undefined,
                    email: undefined,
                    phone: undefined,
                });
            });
            
            it('redirects to the feature root', result => {
                result.PUT.action.should.be.deep.equals(push('/contact'));
            });            
        }
    });

    tests.push({
        name: 'cancel',
        effect: constants.CANCEL,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());
            it('redirects to the login root', result => {
                result.PUT.action.should.be.deep.equals(contactsActions.init());
            });
        }
    });

    tests.push({
        name: 'post success',
        effect: constants.POST,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    values: {
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                        userId: '5aca7ecf76c2f818e0c856a3',
                    }
                }
            };
            const response = {
                status: 200,
                data: {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0
                    }
            };
            const it = sagaHelper(sagaGenerator(request));

            it('post contact', result => {
                result.should.be.an('object').and.include({ '@@redux-saga/IO': true });
                Object.keys(result).should.include('CALL');
                return response;
            });

            it('dispatches success message', result => {
                result.PUT.action.type.should.be.equals('MESSAGE/SEND');
                result.PUT.action.payload.type.should.be.equals('INFO');
            });
   
            it('redirects to the login root', result => {
                result.PUT.action.should.be.deep.equals(contactsActions.init());
            });            
        }
    });

    tests.push({
        name: 'post fail',
        effect: constants.POST,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    values: {
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                        userId: '5aca7ecf76c2f818e0c856a3',
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

    tests.push({
        name: 'put success',
        effect: constants.PUT,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612',
                    values: {
                        name: 'John Does',
                    }
                }
            };
            const response = {
                status: 200,
                data: {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Does',
                        email: 'mail@mail.com',
                        password: 'xxxxxxxx',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0
                    }
            };
            const it = sagaHelper(sagaGenerator(request));

            it('sends put', result => {
                result.should.be.an('object').and.include({ '@@redux-saga/IO': true });
                Object.keys(result).should.include('CALL');
                return response;
            });

            it('dispatches success message', result => {
                result.PUT.action.type.should.be.equals('MESSAGE/SEND');
                result.PUT.action.payload.type.should.be.equals('INFO');
            });

            it('redirects to the contacts page', result => {
                result.PUT.action.should.be.deep.equals(contactsActions.init());
            });            
        }
    });

    tests.push({
        name: 'put fail',
        effect: constants.PUT,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612',
                    values: {
                        name: 'John Does',
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

            it('sends put', result => {
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

    tests.push({
        name: 'remove success',
        effect: constants.REMOVE,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612',
                }
            };
            const response = {
                status: 200,
            };
            const it = sagaHelper(sagaGenerator(request));

            it('sends remove', result => {
                result.should.be.an('object').and.include({ '@@redux-saga/IO': true });
                Object.keys(result).should.include('CALL');
                return response;
            });

            it('dispatches success message', result => {
                result.PUT.action.type.should.be.equals('MESSAGE/SEND');
                result.PUT.action.payload.type.should.be.equals('INFO');
            });

            it('redirects to the contacts page', result => {
                result.PUT.action.should.be.deep.equals(contactsActions.init());
            });            
        }
    });

    tests.push({
        name: 'remove fail',
        effect: constants.REMOVE,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612',
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

            it('sends remove', result => {
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

    tests.push({
        name: 'get success',
        effect: constants.GET,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612'
                }
            };
            const response = {
                status: 200,
                data: {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        company: 'John Doe SA',
                        email: 'mail@mail.com',
                        phone: '5555-5555',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0
                    }
            };
            const it = sagaHelper(sagaGenerator(request));

            it('posts signup', result => {
                result.should.be.an('object').and.include({ '@@redux-saga/IO': true });
                Object.keys(result).should.include('CALL');
                return response;
            });

            it('dispatches load contact action', result => {
                result.PUT.action.type.should.be.equals('CONTACT/LOAD');
                result.PUT.action.payload.should.be.deep.equals({
                    id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    company: 'John Doe SA',
                    email: 'mail@mail.com',
                    phone: '5555-5555',
                });
            });
   
            it('redirects to the contact page', result => {
                result.PUT.action.should.be.deep.equals(actions.init());
            });            
        }
    });

    tests.push({
        name: 'get fail',
        effect: constants.GET,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    id: '5aca7fb03381b71a63011612'
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