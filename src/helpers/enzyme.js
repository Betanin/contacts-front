import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import messages from '../common/messages';
import jsdom from 'jsdom';

function setUpDomEnvironment() {
    const { JSDOM } = jsdom;
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
    const { window } = dom;

    global.window = window;
    global.document = window.document;
    global.navigator = {
        userAgent: 'node.js',
    };
    copyProps(window, global);
}

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

function wrapNode(node, store, locale) {
    return (
        <IntlProvider locale={locale} messages={messages(locale)} >
            <Provider store={store} >
                <MuiThemeProvider>
                    {node}
                </MuiThemeProvider>
            </Provider>
        </IntlProvider>
    )
}

export default (locale = 'en-US') => {

    setUpDomEnvironment();
    configure({ adapter: new Adapter() });

    return {
        shallow(node) {
            return shallow(node);
        },

        render(node, store) {
            const wrappedNode = wrapNode(node, store, locale);
            return render(wrappedNode);
        },

        mount(node, store) {
            const wrappedNode = wrapNode(node, store, locale);
            return mount(wrappedNode);
        }
    };

};