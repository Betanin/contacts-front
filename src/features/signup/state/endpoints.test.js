import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import endpoints from './endpoints';
require('chai').should();

describe('signup endpoints', () => {

    beforeEach(() => moxios.install(axios));

    afterEach(() => moxios.uninstall(axios));

    it('posts signup', done => {

        moxios.stubRequest('/signup', {
            status: 200,
            responseText: JSON.stringify({
                    _id: '5aca7fb03381b71a63011612',
                    name: 'John Doe',
                    email: 'mail@mail.com',
                    password: 'xxxxxxxx',
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
            password: 'xxxxxxxx',
            userId: '5aca7ecf76c2f818e0c856a3'
        })).then(onFulfilled);

        moxios.wait(() => {
            onFulfilled.getCall(0).args[0].status.should.be.equals(200);
            done();
        })
    });    

});