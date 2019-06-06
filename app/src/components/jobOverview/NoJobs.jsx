import React from 'react';
import i18n from '@dhis2/d2-i18n';

const style = {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    height: 60,
    color: '#b8b8b8',
    fontWeight: 300,
};

const NoJobs = () => <div style={style}>{i18n.t('No jobs to show')}</div>;

export default NoJobs;
