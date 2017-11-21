import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import d2 from 'd2/lib/d2';
import { compose, lifecycle, pure } from 'recompose';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Heading from 'd2-ui/lib/headings/Heading.component';
import Paper from 'material-ui/Paper';
import FlipMove from 'react-flip-move';

import * as actionTypes from 'constants/actionTypes';
import Content from 'components/jobContent/Content';
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
};

const List = ({ jobs, toggleJob }) =>
        <div>
            <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                Scheduled Jobs
            </Heading>
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
                    { jobs.map((job, index) =>
                        <LinkedEntry key={job.id} job={job} onToggle={toggleJob} first={index === 0} />
                    )}
                </FlipMove>
            </Paper>
            <Link to={'add'}>
                <AddButton />
            </Link>
        </div>;

class LinkedEntry extends React.Component {
    render = () => (
        <div style={styles.entry}>
            <Link to={`edit/${this.props.job.id}`}>
                <Entry
                    job={this.props.job}
                    onToggle={this.props.onToggle}
                    first={this.props.index === 0}
                />
            </Link>
        </div>
    );
}

const AddButton = () =>
    <div style={{
        position: 'absolute',
        right: 36,
        bottom: 36,
    }}>
        <FloatingActionButton>
            <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
    </div>;

const enhance = compose(
    connect(
        (state) => ({
            jobs: state.jobs.all,
        }),
        dispatch => ({
            toggleJob: job => dispatch({ type: actionTypes.JOB_SAVE, payload: { job }}),
        }),
    ),
    pure,
);

export default enhance(List);