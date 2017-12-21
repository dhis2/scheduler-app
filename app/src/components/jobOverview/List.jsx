import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, pure } from 'recompose';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Heading from 'd2-ui/lib/headings/Heading.component';
import Paper from 'material-ui/Paper';
import FlipMove from 'react-flip-move';

import * as actionTypes from 'constants/actionTypes';
import Entry from 'components/jobOverview/Entry';

const styles = {
    header: {
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
};

const List = ({ jobs, toggleJob }) => (
    <div>
        <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>Scheduled Jobs</Heading>
        <Paper style={styles.paper}>
            <div style={styles.header}>
                <div style={{ flex: 12 }}>Name</div>
                <div style={{ flex: 11 }}>Type</div>
                <div style={{ flex: 7 }}>Status</div>
                <div style={{ flex: 10 }}>Next execution</div>
                <div style={{ flex: 0 }}>Enabled</div>
            </div>
            <Divider />
            <FlipMove duration={400} enterAnimation={false} easing="ease-out">
                {jobs.map((job, index) => (
                    <LinkedEntry key={job.id} job={job} onToggle={toggleJob} first={index === 0} />
                ))}
            </FlipMove>
        </Paper>
        <Link to={'add'}>
            <AddButton />
        </Link>
    </div>
);

const LinkedEntry = ({ job, onToggle, index }) => (
    <div style={styles.entry}>
        <Link to={`edit/${job.id}`}>
            <Entry job={job} onToggle={onToggle} first={index === 0} />
        </Link>
    </div>
);

const AddButton = () => (
    <div style={styles.addButton}>
        <FloatingActionButton>
            <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
    </div>
);

const enhance = compose(
    connect(
        state => ({
            jobs: state.jobs.all,
        }),
        dispatch => ({
            toggleJob: job => dispatch({ type: actionTypes.JOB_SAVE, payload: { job } }),
        }),
    ),
    pure,
);

export default enhance(List);
