import 'typeface-roboto';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import React from 'react';
import { Provider } from 'react-redux';
import HeaderBar from '@dhis2/ui/widgets/HeaderBar';
import i18n from '@dhis2/d2-i18n';
import '../styles/override.css';
import store from '../store';
import MessagePanel from './MessagePanel';
import ContentLoader from './ContentLoader';
import AddD2Context from './AddD2Context';

const App = ({ d2 }) => (
    <Provider store={store}>
        <AddD2Context d2={d2}>
            <div>
                <HeaderBar appName={i18n.t('Scheduler')} />
                <MessagePanel />
                <ContentLoader d2={d2} />
            </div>
        </AddD2Context>
    </Provider>
);

export default App;
