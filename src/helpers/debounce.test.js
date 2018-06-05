import { debounce } from './debounce';
require('chai').should();

describe('debounce', () => {
    let callBack = jest.Mock;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200;
        jest.useFakeTimers();
        callBack = jest.fn();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('is a function', () => {
        debounce.should.be.a('function');
    });

    it('executes prior to timeout', () => {
        const fn = debounce(callBack, 100);

        setTimeout(fn('a'), 150);

        callBack.mock.calls.length.should.be.equals(0);
    });

    it('executes only the last function at the timeout', () => {
        const fn = debounce(callBack, 100);

        fn('a');
        fn('b');
        fn();
        fn();
        jest.runTimersToTime(150);

        callBack.mock.calls.length.should.be.equals(1);

        fn('c');
        jest.runTimersToTime(250);

        callBack.mock.calls.length.should.be.equals(2);
    });
    
});