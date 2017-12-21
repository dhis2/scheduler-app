import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

const styles = {
    button: {
        marginLeft: 16,
    },
};

class ConditionalIconButton extends Component {
    state = { dialogOpen: false };

    openDialog = () => {
        this.setState({ dialogOpen: true });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    confirm = () => {
        this.closeDialog();
        this.props.onConfirm();
    };

    onClick = () => {
        this.props.showConfirmation ? this.openDialog() : this.confirm();
    };

    render = () => {
        const confirmationDialogActions = [
            <FlatButton label="Cancel" primary={true} onClick={this.closeDialog} />,
            <RaisedButton
                primary
                label="Confirm"
                style={{ marginLeft: 16 }}
                onClick={this.confirm}
            />,
        ];

        return (
            <div>
                <Dialog
                    open={this.state.dialogOpen}
                    title={this.props.confirmationMessage}
                    actions={confirmationDialogActions}
                    onRequestClose={this.closeDialog}
                />
                <IconButton onClick={this.onClick} style={styles.button}>
                    <FontIcon className="material-icons">{this.props.icon}</FontIcon>
                </IconButton>
            </div>
        );
    };
}

export default ConditionalIconButton;
