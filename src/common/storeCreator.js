import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { startListener } from './router/listener';
import { routerMiddleware } from './middlewares/routerMiddleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSagas from './rootSagas';

const storeCreator = () => {

    let composeEnhancers = compose;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    middlewares.push(routerMiddleware(browserHistory));
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
    
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSagas);

    const history = createHistory();
    startListener(history, store);

    return store;

};

export default storeCreator;