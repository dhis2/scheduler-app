import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, pure } from 'recompose';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Heading from 'd2-ui/lib/headings/Heading.component';
import Paper from 'material-ui/Paper';
import FlipMove from 'react-flip-move';
import i18next from 'i18next';

import * as actions from 'constants/actions';
import Entry from 'components/jobOverview/Entry';

const styles = {
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
    entry: { backgroundColor: 'white' },
    addButton: {
        position: 'absolute',
        right: 36,
        bottom: 36,
    },
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
            <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                {i18next.t('scheduled_jobs')}
            </Heading>
            <div style={styles.systemJobToggleContainer}>
                {i18next.t('show_system_jobs')}
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
                <div style={{ flex: 12 }}>{i18next.t('name')}</div>
                <div style={{ flex: 11 }}>{i18next.t('type')}</div>
                <div style={{ flex: 8 }}>{i18next.t('status')}</div>
                <div style={{ flex: 9 }}>{i18next.t('next_execution')}</div>
                <div style={{ flex: 0 }}>{i18next.t('enabled')}</div>
            </div>
            <Divider />
            <FlipMove duration={400} enterAnimation={false} easing="ease-out">
                {jobs.map((job, index) => (
                    <LinkedEntry
                        key={job.id}
                        job={job}
                        onToggle={toggleJob}
                        onRun={runJob}
                        first={index === 0}
                    />
                ))}
            </FlipMove>
        </Paper>
        <Link to={'add'}>
            <AddButton />
        </Link>
    </div>
);

// eslint-disable-next-line
class LinkedEntry extends Component {
    render = () => (
        <div style={styles.entry}>
            <Link to={`edit/${this.props.job.id}`}>
                <Entry
                    job={this.props.job}
                    onToggle={this.props.onToggle}
                    onRun={this.props.onRun}
                    first={this.props.index === 0}
                />
            </Link>
        </div>
    );
}

const AddButton = () => (
    <div style={styles.addButton}>
        <FloatingActionButton>
            <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
    </div>
);

const enhance = compose(
    connect(
        state => {
            const jobs = state.jobs.all.filter(job =>
                (state.jobs.showSystemJobs ? !job.configurable : job.configurable),
            );

            return {
                jobs,
                showSystemJobs: state.jobs.showSystemJobs,
            };
        },
        dispatch => ({
            toggleJob: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
            toggleSystemJobs: enabled => dispatch({ type: actions.TOGGLE_SYSTEM_JOBS, payload: { enabled } }),
            runJob: id => dispatch({ type: actions.JOB_RUN, payload: { id } }),
        }),
    ),
    pure,
);

export default enhance(List);
