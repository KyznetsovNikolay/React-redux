import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reducer from './dataReducer';

export default history => combineReducers({
    data: reducer,
    router: connectRouter(history)
});