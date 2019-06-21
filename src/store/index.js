import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    applyMiddleware(logger, routerMiddleware(history), thunk)
);

export default store;