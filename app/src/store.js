import Epics from 'actions/epics';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import editReducer from 'reducers/editReducer';
import jobsReducer from 'reducers/jobsReducer';
import messageReducer from 'reducers/messageReducer';
import createLogger from 'redux-logger';

const middlewares = [createEpicMiddleware(Epics)];

if (process.env.NODE_ENV === "development") {
    middlewares.push(
        createLogger(),
    );
}

const reducer = combineReducers({
    edit: editReducer,
    jobs: jobsReducer,
    message: messageReducer,
});

export default createStore(
    reducer,
    applyMiddleware(...middlewares),
);
