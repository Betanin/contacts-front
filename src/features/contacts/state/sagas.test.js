import sagas from './sagas';
import constants from './constants';
import { call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { push } from '../../../common/router/actions';
import { runSagasTests } from '../../../helpers/tests';
require('chai').should();

describe('contacts sagas', () => {

    const fn = jest.fn();
    const tests = [];

    tests.push({
        name: 'init',
        effect: constants.INIT,
        fn: (sagaGenerator) => {
            const it = sagaHelper(sagaGenerator());
            it('redirects to the app root', result => {
                result.should.be.an('object');
                Object.keys(result).should.include('ALL');
                result.ALL[0].PUT.action.should.be.deep.equals(push('/'));
                result.ALL[1].CALL.fn.should.be.a('function');
            });
        }
    });

    tests.push({
        name: 'get success',
        effect: constants.FETCH_ALL,
        fn: (sagaGenerator) => {
            const response = {
                status: 200,
                data: [
                    {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        company: 'Doe SA',
                        phone: '555-55555',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0
                    },
                    {
                        _id: '5acec37a89fc1025cb41abdb',
                        name: 'John Doe 2',
                        email: 'mail@mail.com',
                        company: 'Doe SA',
                        phone: '555-55555',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-12T02:24:58.773Z',
                        updatedAt: '2018-04-12T02:24:58.773Z',
                        __v: 0
                    }
                ]
            };
            const it = sagaHelper(sagaGenerator());

            it('gets contacts', result => {
                JSON.stringify(result).should.be.equals(JSON.stringify(call(fn)));
                return response;
            });

            it('loads the contacts', result => {
                result.PUT.action.type.should.be.equals('CONTACTS/LOAD_ALL');
            });
        }
    });

    tests.push({
        name: 'get fail',
        effect: constants.FETCH_ALL,
        fn: (sagaGenerator) => {
            const response = {
                status: 400,
                data: {
                    error: {
                        message: 'Error test'
                    }
                }
            };
            const it = sagaHelper(sagaGenerator());
            
            it('gets contacts', result => {
                JSON.stringify(result).should.be.equals(JSON.stringify(call(fn)));
                return response;
            });

            it('dispatches error message', result => {
                result.PUT.action.type.should.be.equals('MESSAGE/SEND');
                result.PUT.action.payload.type.should.be.equals('ERROR');
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
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        company: 'Doe SA',
                        phone: '555-55555',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0,
                    }
                }
            };
            const response = {
                status: 200,
                data: {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        company: 'Doe SA',
                        phone: '555-55555',
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
   
        }
    });

    tests.push({
        name: 'post fail',
        effect: constants.POST,
        fn: (sagaGenerator) => {
            const request = {
                payload: {
                    values: {
                        _id: '5aca7fb03381b71a63011612',
                        name: 'John Doe',
                        email: 'mail@mail.com',
                        company: 'Doe SA',
                        phone: '555-55555',
                        userId: '5aca7ecf76c2f818e0c856a3',
                        createdAt: '2018-04-08T20:46:40.528Z',
                        updatedAt: '2018-04-08T20:46:40.528Z',
                        __v: 0,
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