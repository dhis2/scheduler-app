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
import ContentLoader from './ContentLoader';
import D2Provider from './D2Provider';

const App = ({ d2 }) => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
            <D2Provider d2={d2}>
                <React.Fragment>
                    <HeaderBar appName={i18n.t('Scheduler')} />
                    <MessagePanel />
                    <ContentLoader d2={d2} />
                </React.Fragment>
            </D2Provider>
        </MuiThemeProvider>
    </Provider>
);

export default App;
