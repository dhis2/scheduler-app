const cronExpressions = [
    { text: 'Custom', value: '' },
    { text: 'Every hour', value: '0 0 * ? * *' },
    { text: 'Every day midnight', value: '0 0 1 ? * *' },
    { text: 'Every day at three am', value: '0 0 3 ? * *' },
    { text: 'Every weekday at noon', value: '0 0 12 ? * MON-FRI' },
    { text: 'Every week', value: '0 0 3 ? * MON' },
];

export default cronExpressions;
