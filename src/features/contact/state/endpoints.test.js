import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import endpoints from './endpoints';
require('chai').should();

describe('contact endpoints', () => {

    beforeEach(() => moxios.install(axios));

    afterEach(() => moxios.uninstall(axios));

    it('posts contact', done => {

        moxios.stubRequest('/contact', {
            status: 200,
            responseText: JSON.stringify({
                    _id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    email: 'mail@mail.com',
                    userId: '5aca7ecf76c2f818e0c856a3',
                    createdAt: '2018-04-08T20:46:40.528Z',
                    updatedAt: '2018-04-08T20:46:40.528Z',
                    __v: 0
                })
        });

        let onFulfilled = sinon.spy();
        endpoints.post(JSON.stringify({
            name: 'John Doe',
            email: 'mail@mail.com',
            userId: '5aca7ecf76c2f818e0c856a3'
        })).then(onFulfilled);

        moxios.wait(() => {
            onFulfilled.getCall(0).args[0].status.should.be.equals(200);
            done();
        })
    });

    it('gets contact', done => {

        moxios.stubRequest('/contact/5aca7fb03381b71a63011612', {
            status: 200,
            responseText: JSON.stringify({
                    _id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    email: 'mail@mail.com',
                    userId: '5aca7ecf76c2f818e0c856a3',
                    createdAt: '2018-04-08T20:46:40.528Z',
                    updatedAt: '2018-04-08T20:46:40.528Z',
                    __v: 0
                })
        });

        let onFulfilled = sinon.spy();
        endpoints.get('5aca7fb03381b71a63011612').then(onFulfilled);

        moxios.wait(() => {
            const response = onFulfilled.getCall(0).args[0];
            response.status.should.be.equals(200);
            response.data.should.contains({
                _id: '5aca7fb03381b71a63011612',
                name: 'John Doe',
                email: 'mail@mail.com',
                userId: '5aca7ecf76c2f818e0c856a3',
            });
            done();
        })
    });

    it('puts contact', done => {

        moxios.stubRequest('/contact/5aca7fb03381b71a63011612', {
            status: 200,
            responseText: JSON.stringify({
                    _id: '5aca7fb03381b71a63011612',
                    name: 'John Does',
                    email: 'mail@mail.com',
                    userId: '5aca7ecf76c2f818e0c856a3',
                    createdAt: '2018-04-08T20:46:40.528Z',
                    updatedAt: '2018-04-08T20:46:40.528Z',
                    __v: 0
                })
        });

        let onFulfilled = sinon.spy();
        endpoints.put(
            '5aca7fb03381b71a63011612',
            JSON.stringify({
                name: 'John Does',
            })
        ).then(onFulfilled);

        moxios.wait(() => {
            const response = onFulfilled.getCall(0).args[0];
            response.status.should.be.equals(200);
            response.data.should.contains({
                _id: '5aca7fb03381b71a63011612',
                name: 'John Does',
            });
            done();
        })        
    });

    it('deletes contact', done => {

        moxios.stubRequest('/contact/5aca7fb03381b71a63011612', {
            status: 200,
        });

        let onFulfilled = sinon.spy();
        endpoints.remove('5aca7fb03381b71a63011612').then(onFulfilled);

        moxios.wait(() => {
            const response = onFulfilled.getCall(0).args[0];            
            response.status.should.be.equals(200);
            done();
        })        
    });    

});