import React from 'react';
import { render } from 'react-dom';
import { getManifest } from 'd2/lib/d2';
import 'whatwg-fetch';

import Scheduler from 'components/Scheduler';

const dhisVersion = 29;
const schemas = ['jobConfiguration'];

getManifest('./manifest.webapp')
    .then(manifest => manifest.getBaseUrl())
    .catch(() => DHIS_CONFIG.baseUrl)
    .then(url => {
        const baseUrl = `${url}/api/${dhisVersion}`;
        const config = {
            baseUrl,
            headers: PRODUCTION ? null : DHIS_CONFIG.authorization,
            schemas,
        };

        render(<Scheduler config={config} />, document.getElementById('scheduler'));
    });
