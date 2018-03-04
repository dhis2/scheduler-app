import React from 'react';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import i18next from 'i18next';

import ConditionalIconButton from 'components/ConditionalIconButton';

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
            jobType: job.jobType,
            jobParameters: job.jobParameters,
            continuousExecution: job.continuousExecution,
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

    return (
        <div onClick={onSelect} style={styles.listEntry}>
            <div style={{ ...styles.displayName, flex: 12 }}>{job.displayName}</div>
            <div style={{ ...styles.noWrap, flex: 11 }}>{i18next.t(job.jobType)}</div>
            <div style={styles.status}>
                <div>{i18next.t(job.jobStatus)}</div>
                {canRunNow(job.jobStatus) && (
                    <ConditionalIconButton
                        showConfirmation
                        confirmationMessage={`${i18next.t('are_you_sure_you_want_to_execute')} "${
                            job.name
                        }"?`}
                        confirmLabel={i18next.t('execute')}
                        onConfirm={run}
                        icon="play_arrow"
                        tooltip={i18next.t('run_now')}
                        iconStyle={styles.runIcon}
                    />
                )}
            </div>
            <div style={{ flex: 9 }}>{nextExecutionText}</div>
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
