import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import i18n from 'locales';

const styles = {
    button: {
        marginLeft: 16,
    },
};

class ConditionalIconButton extends Component {
    state = { dialogOpen: false };

    onClick = event => {
        event.stopPropagation();
        event.preventDefault();

        this.props.showConfirmation ? this.openDialog() : this.confirm();
    };

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

    render = () => {
        const confirmationDialogActions = [
            <FlatButton primary label={i18n.t('Cancel')} onClick={this.closeDialog} />,
            <RaisedButton
                primary
                label={this.props.confirmLabel || i18n.t('Confirm')}
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
                <IconButton
                    onClick={this.onClick}
                    style={styles.button}
                    tooltip={this.props.tooltip}
                    iconStyle={this.props.iconStyle}
                >
                    <FontIcon className="material-icons">{this.props.icon}</FontIcon>
                </IconButton>
            </div>
        );
    };
}

export default ConditionalIconButton;
