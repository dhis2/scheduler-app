import React from 'react';
import { render } from 'react-dom';
import { init, getManifest, getUserSettings } from 'd2/lib/d2';

import configI18n from 'utils/configI18n';
import Scheduler from 'components/Scheduler';

import 'typeface-roboto'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

let dhisConfig;
let d2Instance;

const dhisVersion = 32;
const schemas = [];

getManifest('./manifest.webapp')
    // Fetch API url from manifest file.
    .then(manifest => manifest.getBaseUrl())

    // Use default configuration if not found (development).
    .catch(() => DHIS_CONFIG.baseUrl)

    // Initialize d2 with url, authorization and schema settings.
    .then(url => {
        dhisConfig = {
            baseUrl: `${url}/api/${dhisVersion}`,
            headers: PRODUCTION ? null : DHIS_CONFIG.authorization,
            schemas,
        };

        return init(dhisConfig);
    })

    .then(d2 => {
        d2Instance = d2;
    })

    // Get user settings from d2, namely the UI language.
    .then(getUserSettings)

    // Configure i18n with the user settings.
    .then(configI18n)

    // Render the Scheduler root component.
    .then(() => {
        render(<Scheduler d2={d2Instance} />, document.getElementById('scheduler'));
    });
