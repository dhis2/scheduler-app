import Epics from 'actions/epics';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import jobsReducer from 'reducers/jobsReducer';
import messageReducer from 'reducers/messageReducer';
import createLogger from 'redux-logger';

const middlewares = [createEpicMiddleware(Epics)];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "development") {
    middlewares.push(
        createLogger(),
    );
}

const reducer = combineReducers({
    jobs: jobsReducer,
    message: messageReducer,
});

export default createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    ),
);
