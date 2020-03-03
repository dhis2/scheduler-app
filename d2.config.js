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
    coreApp: true,
    entryPoints: {
        app: './src/components/App',
    },
}

module.exports = config
