import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import Epics from 'actions/epics';
import jobsReducer from 'reducers/jobsReducer';
import messageReducer from 'reducers/messageReducer';
import pendingReducer from 'reducers/pendingReducer';

const middlewares = [createEpicMiddleware(Epics)];

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
}

const reducer = combineReducers({
    jobs: jobsReducer,
    message: messageReducer,
    pending: pendingReducer,
});

export default createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));
