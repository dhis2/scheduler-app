const cronExpressions = [
    { text: 'CUSTOM', value: '' },
    { text: 'EVERY_HOUR', value: '0 0 * ? * *' },
    { text: 'EVERY_DAY_MIDNIGHT', value: '0 0 1 ? * *' },
    { text: 'EVERY_DAY_THREE_AM', value: '0 0 3 ? * *' },
    { text: 'EVERY_WEEKDAY_NOON', value: '0 0 12 ? * MON-FRI' },
    { text: 'EVERY_WEEK', value: '0 0 3 ? * MON' },
];

export default cronExpressions;
