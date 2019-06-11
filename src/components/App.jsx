import 'typeface-roboto';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '@dhis2/ui/widgets/HeaderBar';
import i18n from '@dhis2/d2-i18n';
import theme from '../styles/theme';
import '../styles/override.css';
import store from '../store';
import MessagePanel from './MessagePanel';
import Routes from './Routes';
import AuthWall from './AuthWall';
import D2Provider from './D2Provider';

const getSymbolProperties = symbol => Array.from(symbol[Object.getOwnPropertySymbols(symbol)[0]]);
const isUserAuthorized = d2 => {
    const userAuthorities = getSymbolProperties(d2.currentUser.authorities);
    return userAuthorities.includes('ALL') || userAuthorities.includes('F_SCHEDULING_ADMIN');
};

const App = ({ d2 }) => {
    const isAuthorized = isUserAuthorized(d2);

    return (
        <Provider store={store}>
            <MuiThemeProvider muiTheme={theme}>
                <D2Provider d2={d2}>
                    <React.Fragment>
                        <HeaderBar appName={i18n.t('Scheduler')} />
                        <MessagePanel />
                        <AuthWall isAuthorized={isAuthorized}>
                            <Routes />
                        </AuthWall>
                    </React.Fragment>
                </D2Provider>
            </MuiThemeProvider>
        </Provider>
    );
};

export default App;
