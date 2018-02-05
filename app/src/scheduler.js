import React from 'react';
import { render } from 'react-dom';
import { getManifest } from 'd2/lib/d2';
import 'whatwg-fetch';

import Scheduler from 'components/Scheduler';
import { BASE_URL, SYSTEM_AUTH } from 'constants/development';

const dhisVersion = 29;
const schemas = ['jobConfiguration'];

getManifest('./manifest.webapp')
    .then(manifest => manifest.getBaseUrl())
    .catch(() => BASE_URL)
    .then(url => {
        const baseUrl = `${url}/api/${dhisVersion}`;
        const production = process.env.NODE_ENV === 'production';
        const config = {
            baseUrl,
            headers: production ? null : SYSTEM_AUTH,
            schemas,
        };

        render(<Scheduler config={config} />, document.getElementById('scheduler'));
    });
