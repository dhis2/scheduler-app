import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import { Router, Route } from 'react-router-dom';
import { compose, lifecycle, pure, branch, renderComponent } from 'recompose';
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

const Root = () => (
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

const ContentLoader = compose(
    connect(
        () => ({}),
        dispatch => ({
            loadJobs: () => dispatch({ type: actions.JOBS_LOAD }),
            loadConfiguration: () => dispatch({ type: actions.CONFIGURATION_LOAD }),
            notAuthorized: () => dispatch({ type: actions.NOT_AUTHORIZED }),
        }),
    ),
    branch(
        // Render an 'unauthorized' message if user is not authorized.
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
)(Root);

class AddD2Context extends React.Component {
    getChildContext = () => ({
        d2: this.props.d2,
    });

    render = () => <MuiThemeProvider muiTheme={theme}>{this.props.children}</MuiThemeProvider>;
}

AddD2Context.propTypes = {
    children: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
};

AddD2Context.childContextTypes = {
    d2: PropTypes.object,
};

const Scheduler = ({ d2 }) => (
    <Provider store={store}>
        <AddD2Context d2={d2}>
            <div>
                <HeaderBar />
                <MessagePanel />
                <ContentLoader d2={d2} />
            </div>
        </AddD2Context>
    </Provider>
);

export default Scheduler;
