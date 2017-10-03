import Epics from "./actions/epics";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import jobsReducer from './reducers/jobsReducer';
import createLogger from "redux-logger";

const middlewares = [createEpicMiddleware(Epics)];

if (process.env.NODE_ENV === "development") {
    middlewares.push(
        createLogger(),
    );
}

const reducer = combineReducers({
    jobs: jobsReducer,
});

export default createStore(
    reducer,
    applyMiddleware(...middlewares),
);
