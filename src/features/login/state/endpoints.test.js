import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import endpoints from './endpoints';
require('chai').should();

describe('login endpoints', () => {

    beforeEach(() => moxios.install(axios));

    afterEach(() => moxios.uninstall(axios));

    it('posts', done => {

        moxios.stubRequest('/login', {
            status: 200,
            responseText: JSON.stringify({
                    token: '5aca7ecf76c2f818e0c856a3',
                })
        });

        let onFulfilled = sinon.spy();
        endpoints.post(JSON.stringify({
            email: 'mail@mail.com',
            password: 'xxxxxxxx',
        })).then(onFulfilled);

        moxios.wait(() => {
            onFulfilled.getCall(0).args[0].status.should.be.equals(200);
            done();
        })
    });    

});