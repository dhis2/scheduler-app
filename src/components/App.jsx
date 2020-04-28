import 'typeface-roboto';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import React from 'react';
import { Provider } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { HeaderBar } from '@dhis2/ui-widgets';
import { CssReset } from '@dhis2/ui-core';
import { Provider as RuntimeProvider } from '@dhis2/app-runtime';
import store from '../store';
import MessagePanel from './MessagePanel';
import ContentLoader from './ContentLoader';
import AddD2Context from './AddD2Context';
import '../styles/override.css';

const App = ({ d2, baseUrl, apiVersion }) => (
    <RuntimeProvider config={{
        baseUrl,
        apiVersion,
    }}
    >
        <Provider store={store}>
            <AddD2Context d2={d2}>
                <div>
                    <CssReset />
                    <HeaderBar appName={i18n.t('Scheduler')} />
                    <MessagePanel />
                    <ContentLoader d2={d2} />
                </div>
            </AddD2Context>
        </Provider>
    </RuntimeProvider>
);

export default App;
