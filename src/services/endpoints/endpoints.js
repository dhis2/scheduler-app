import urlJoin from 'url-join'

const base = process.env.REACT_APP_DHIS2_BASE_URL

const endpoints = {
    me: urlJoin(base, '/api/me'),
    jobs: urlJoin(base, '/api/jobConfigurations'),
    jobTypes: urlJoin(base, '/api/jobConfigurations/jobTypesExtended'),
}

export default endpoints
