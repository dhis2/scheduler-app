// https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html

const description =
    'The Scheduler is an application for managing background jobs in DHIS2. ' +
    'Background jobs can do a number of tasks, such as running analytics, ' +
    'synchronizing data and meta data, or sending a push analysis report. ' +
    'The application provides the ability to create, modify and delete such jobs.'

const config = {
    title: 'Scheduler',
    name: 'scheduler',
    description,
    type: 'app',
    id: '2eacfda3-e887-4121-80bc-63ee82fba5e9',
    minDHIS2Version: '2.36',
    maxDHIS2Version: '2.39',
    coreApp: true,
    entryPoints: {
        app: './src/components/App/index.js',
    },
}

module.exports = config
