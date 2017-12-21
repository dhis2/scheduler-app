import React from 'react';
import { connect, Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import D2UIApp from 'd2-ui/lib/app/D2UIApp';
import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import { Router, Route } from 'react-router-dom';
import { compose, lifecycle, pure } from 'recompose';
import d2 from 'd2/lib/d2';

import List from 'components/jobOverview/List';
import EditJob from 'components/jobContent/EditJob';
import AddJob from 'components/jobContent/AddJob';
import MessagePanel from 'components/MessagePanel';
import * as actionTypes from 'constants/actionTypes';
import { BASE_URL } from 'api/api';

import theme from '../styles/theme';
import '../styles/override.css';
import store from '../store';
import history from '../history';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

injectTapEventPlugin();

const styles = {
    content: {
        paddingTop: '100px',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
    },
};

let ContentLoader = () => (
    <Router history={history}>
        <div style={styles.content}>
            <MessagePanel />
            <HeaderBar />
            <Route exact path="/" component={List} />
            <Route path="/edit/:id" component={EditJob} />
            <Route path="/add" component={AddJob} />
        </div>
    </Router>
);

ContentLoader = compose(
    connect(
        () => ({}),
        dispatch => ({
            loadJobs: () => dispatch({ type: actionTypes.JOBS_LOAD }),
            loadConfiguration: () => dispatch({ type: actionTypes.CONFIGURATION_LOAD }),
        }),
    ),
    lifecycle({
        componentWillMount() {
            d2.init({ baseUrl: BASE_URL }).then(() => {
                this.props.loadJobs();
                this.props.loadConfiguration();
            });
        },
    }),
    pure,
)(ContentLoader);

const Scheduler = () => (
    <Provider store={store}>
        <D2UIApp initConfig={{ baseUrl: BASE_URL }} muiTheme={theme}>
            <ContentLoader />
        </D2UIApp>
    </Provider>
);

export default Scheduler;
