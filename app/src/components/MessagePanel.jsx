import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

const DEFAULT_MESSAGE_DURATION = 4000;

class MessagePanel extends Component {
    state = {
        show: false,
    }

    componentWillReceiveProps = () => {
        this.setState({
            show: true,
        });
    }

    closeMessage = () => {
        this.setState({
            show: false,
        });
    }

    render = () =>
        <Snackbar
            open={this.state.show}
            message={this.props.message}
            autoHideDuration={DEFAULT_MESSAGE_DURATION}
            onRequestClose={this.closeMessage}
        />
}

export default connect(
    state => ({
        message: state.message.message,
        type: state.message.type,
    }),
)(MessagePanel);