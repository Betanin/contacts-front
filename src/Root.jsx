import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { Contacts } from './features/contacts';
import { Contact } from './features/contact';
import { Message } from './features/message';
import { Signup } from './features/signup';
import { Login, loginActions } from './features/login';
import './Root.css';

const Root = ({ store }) => {

    const path = store.getState().router.pathname;
    const redirect = path !== '/login' || '/signup';
    
    store.dispatch(loginActions.recoverSession(redirect));

    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <div>
                    <Router history={browserHistory}>
                        <Route path='/' component={Contacts} />
                        <Route path='/contact' component={Contact} />
                        <Route path='/login' component={Login} />
                        <Route path='/signup' component={Signup} />
                    </Router>
                    <Message />
                </div>
            </MuiThemeProvider>
        </Provider>
    );

};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;