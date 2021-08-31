import React from 'react';
import Toggle from 'material-ui/Toggle';
import i18n from '@dhis2/d2-i18n';
import moment from 'moment';

import { CRON } from '../../constants/schedulingTypes';
import ConditionalIconButton from '../ConditionalIconButton';

const styles = {
    listEntry: {
        color: 'black',
        cursor: 'pointer',
        paddingLeft: 24,
        paddingRight: 24,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        fontSize: 14,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    someWeight: { flex: 10 },
    displayName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 20,
    },
    noWrap: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    status: {
        flex: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    runIcon: {
        color: '#50A799',
    },
};

const canRunNow = jobStatus => jobStatus !== 'RUNNING' && jobStatus !== 'DISABLED';

const Entry = ({ job, onSelect, onToggle, onRun }) => {
    const nextExecution = moment(job.nextExecutionTime);
    const nextExecutionText = nextExecution.format('DD.MM.YYYY HH:mm');

    const toggle = (e, value) => {
        onToggle({
            id: job.id,
            name: job.name,
            delay: job.delay,
            jobType: job.jobType,
            jobParameters: job.jobParameters,
            cronExpression: job.cronExpression,
            enabled: value,
        });
    };

    const run = () => {
        onRun(job.id);
    };
    const toggleClick = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    const isCron = job.schedulingType === CRON;

    return (
        <div onClick={onSelect} style={styles.listEntry}>
            <div style={{ ...styles.displayName, flex: 12 }}>{job.displayName}</div>
            <div style={{ ...styles.noWrap, flex: 11 }}>{i18n.t(job.jobType)}</div>
            <div style={styles.status}>
                <div>{i18n.t(job.jobStatus)}</div>
                {canRunNow(job.jobStatus) && (
                    <ConditionalIconButton
                        showConfirmation
                        confirmationMessage={`${i18n.t(
                            'Are you sure you want to execute this job?',
                        )} "${job.name}"`}
                        confirmLabel={i18n.t('Execute')}
                        onConfirm={run}
                        icon="play_arrow"
                        tooltip={i18n.t('Run now')}
                        iconStyle={styles.runIcon}
                    />
                )}
            </div>
            <div style={{ flex: 9 }}>{
                isCron
                    ? nextExecutionText
                    : i18n.t('Runs {{seconds}} second(s) after previous run', { seconds: job.delay })
            }</div>
            <div>
                <Toggle
                    disabled={job.configurable === false}
                    toggled={job.enabled}
                    onToggle={toggle}
                    onClick={toggleClick}
                />
            </div>
        </div>
    );
};

export default Entry;