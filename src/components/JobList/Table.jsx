import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import i18n from '@dhis2/d2-i18n';
import * as actions from '../../constants/actions';
import NoJobs from './NoJobs';
import TableItem from './TableItem';

const styles = {
    tableHeader: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
        fontWeight: 600,
    },
    paper: { backgroundColor: '#e0e0e0' },
};

const renderJobs = ({ jobs, toggleJob, runJob }) => {
  if (jobs.length === 0) {
    return <NoJobs />;
  }

  return jobs.map(job => <TableItem key={job.id} job={job} onToggle={toggleJob} onRun={runJob} />);
};

const Table = ({ jobs, toggleJob, runJob }) => (
    <Paper style={styles.paper}>
        <div style={styles.tableHeader}>
            <div style={{ flex: 12 }}>{i18n.t('Name')}</div>
            <div style={{ flex: 11 }}>{i18n.t('Type')}</div>
            <div style={{ flex: 8 }}>{i18n.t('Status')}</div>
            <div style={{ flex: 9 }}>{i18n.t('Next execution')}</div>
            <div style={{ flex: 0 }}>{i18n.t('Enabled')}</div>
        </div>
        <Divider />
        {renderJobs({ jobs, toggleJob, runJob })}
    </Paper>
);

const mapStateToProps = state => ({
    jobs: state.jobs.all.filter(
        job => (state.jobs.showSystemJobs ? !job.configurable : job.configurable),
    ),
});

const mapDispatchToProps = dispatch => ({
    toggleJob: job => dispatch({ type: actions.JOB_SAVE, payload: { job } }),
    runJob: id => dispatch({ type: actions.JOB_RUN, payload: { id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
