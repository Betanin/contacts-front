import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import endpoints from './endpoints';
require('chai').should();

describe('contacts endpoints', () => {

    beforeEach(() => moxios.install(axios));

    afterEach(() => moxios.uninstall(axios));

    it('gets contacts', function (done) {

        moxios.stubRequest('/contact', {
            status: 200,
            responseText: JSON.stringify([
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
            ])
        });

        let onFulfilled = sinon.spy();
        endpoints.get().then(onFulfilled);

        moxios.wait(() => {
            onFulfilled.getCall(0).args[0].status.should.be.equals(200);
            done();
        })
    });

    it('posts contacts', function (done) {

        moxios.stubRequest('/contact', {
            status: 200,
            responseText: JSON.stringify({
                    _id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    email: 'mail@mail.com',
                    company: 'Doe SA',
                    phone: '555-55555',
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
            company: 'Doe SA',
            phone: '555-55555',
            userId: '5aca7ecf76c2f818e0c856a3'
        })).then(onFulfilled);

        moxios.wait(() => {
            onFulfilled.getCall(0).args[0].status.should.be.equals(200);
            done();
        })
    });    

});