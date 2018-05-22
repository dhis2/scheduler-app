import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import AppWithD2 from 'd2-ui/lib/app/AppWithD2.component';
import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import { Router, Route } from 'react-router-dom';
import { compose, lifecycle, pure, branch, getContext, renderComponent } from 'recompose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import List from 'components/jobOverview/List';
import EditJob from 'components/jobContent/EditJob';
import AddJob from 'components/jobContent/AddJob';
import MessagePanel from 'components/MessagePanel';
import * as actions from 'constants/actions';
import history from 'utils/history';

import theme from '../styles/theme';
import '../styles/override.css';
import store from '../store';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

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
            <Route exact path="/" component={List} />
            <Route path="/edit/:id" component={EditJob} />
            <Route path="/add" component={AddJob} />
        </div>
    </Router>
);

const getSymbolProperties = symbol => Array.from(symbol[Object.getOwnPropertySymbols(symbol)[0]]);
const userIsNotAuthorized = props => {
    const userAuthorities = getSymbolProperties(props.d2.currentUser.authorities);
    return !userAuthorities.includes('ALL') && !userAuthorities.includes('F_SCHEDULING_ADMIN');
};

ContentLoader = compose(
    connect(
        () => ({}),
        dispatch => ({
            loadJobs: () => dispatch({ type: actions.JOBS_LOAD }),
            loadConfiguration: () => dispatch({ type: actions.CONFIGURATION_LOAD }),
            notAuthorized: () => dispatch({ type: actions.NOT_AUTHORIZED }),
        }),
    ),
    branch(
        userIsNotAuthorized,
        renderComponent(
            compose(
                lifecycle({
                    componentWillMount() {
                        this.props.notAuthorized();
                    },
                }),
            )(() => null),
        ),
    ),
    lifecycle({
        componentWillMount() {
            this.props.loadJobs();
            this.props.loadConfiguration();
        },
    }),
    pure,
)(ContentLoader);

class App extends React.Component {
    getChildContext = () => ({
        d2: this.props.d2,
    })

    render = () => (
        <div>
            {this.props.children}
        </div>
    );
}

App.propTypes = {
    children: PropTypes.array.isRequired,
    d2: PropTypes.object.isRequired,
};

App.childContextTypes = {
    d2: PropTypes.object,
};

const Scheduler = ({ d2 }) => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
            <App d2={d2}>
                <HeaderBar />
                <MessagePanel />
                <ContentLoader />
            </App>
        </MuiThemeProvider>
    </Provider>
);

export default Scheduler;
