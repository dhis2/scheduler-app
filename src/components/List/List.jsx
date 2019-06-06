import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, pure } from 'recompose';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import FlipMove from 'react-flip-move';
import i18n from '@dhis2/d2-i18n';
import * as actions from '../../constants/actions';
import { AddButton, HelpButton } from '../Buttons';
import Heading from '../Heading';
import NoJobs from './NoJobs';
import EntryWrap from './EntryWrap';

const documentationHref = 'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html';

const styles = {
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
        fontWeight: 600,
    },
    paper: { backgroundColor: '#e0e0e0' },
    systemJobToggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '16px 24px',
    },
    systemJobToggle: {
        width: 'auto',
    },
    systemJobToggleTrack: {
        backgroundColor: '#dddddd',
    },
};

const List = ({ jobs, showSystemJobs, toggleJob, toggleSystemJobs, runJob }) => (
    <div>
        <div style={styles.header}>
            <div style={styles.headerLeft}>
                <Heading>{i18n.t('Scheduled jobs')}</Heading>
                <HelpButton href={documentationHref} />
            </div>
            <div style={styles.systemJobToggleContainer}>
                {i18n.t('Show system jobs')}
                <Toggle
                    style={styles.systemJobToggle}
                    trackStyle={styles.systemJobToggleTrack}
                    toggled={showSystemJobs}
                    onToggle={() => toggleSystemJobs(!showSystemJobs)}
                />
            </div>
        </div>
        <Paper style={styles.paper}>
            <div style={styles.tableHeader}>
                <div style={{ flex: 12 }}>{i18n.t('Name')}</div>
                <div style={{ flex: 11 }}>{i18n.t('Type')}</div>
                <div style={{ flex: 8 }}>{i18n.t('Status')}</div>
                <div style={{ flex: 9 }}>{i18n.t('Next execution')}</div>
                <div style={{ flex: 0 }}>{i18n.t('Enabled')}</div>
            </div>
            <Divider />
            {jobs.length === 0 ? (
                <NoJobs />
            ) : (
                <FlipMove duration={400} enterAnimation={false} easing="ease-out">
                    {jobs.map(job => (
                        <EntryWrap key={job.id} job={job} onToggle={toggleJob} onRun={runJob} />
                    ))}
                </FlipMove>
            )}
        </Paper>
        <Link to={'add'}>
            <AddButton />
        </Link>
    </div>
);

const enhance = compose(
    connect(
        state => {
            const jobs = state.jobs.all.filter(
                job => (state.jobs.showSystemJobs ? !job.configurable : job.configurable),
            );

            return {
                jobs,
                showSystemJobs: state.jobs.showSystemJobs,
            };
        },
        dispatch => ({
            toggleJob: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
            toggleSystemJobs: enabled =>
                dispatch({ type: actions.TOGGLE_SYSTEM_JOBS, payload: { enabled } }),
            runJob: id => dispatch({ type: actions.JOB_RUN, payload: { id } }),
        }),
    ),
    pure,
);

export default enhance(List);
