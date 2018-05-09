import React from 'react';
import { render } from 'react-dom';
import { getManifest, getUserSettings } from 'd2/lib/d2';
import 'whatwg-fetch';

import Scheduler from 'components/Scheduler';
import i18n from 'locales';

const dhisVersion = 29;
const schemas = ['jobConfiguration'];

const configI18n = userSettings => {
    i18n.changeLanguage(userSettings.keyUiLocale);
};

getUserSettings()
    .then(configI18n)
    .then(() => getManifest('./manifest.webapp'))
    .then(manifest => manifest.getBaseUrl())
    .catch(() => DHIS_CONFIG.baseUrl)
    .then(url => ({
        baseUrl: `${url}/api/${dhisVersion}`,
        headers: PRODUCTION ? null : DHIS_CONFIG.authorization,
        schemas,
    }))
    .then(config => {
        render(<Scheduler config={config} />, document.getElementById('scheduler'));
    });
