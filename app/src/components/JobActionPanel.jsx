import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

const deleteButtonStyle = {
    backgroundColor: 'tomato',
}

const buttonPanelStyle = {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
}

class JobActionPanel extends Component {
    state = {
        deleteDialogOpen: false,
    }

    openDeleteConfirmationDialog = () => {
        this.setState({
            deleteDialogOpen: true,
        });
    }

    closeDeleteConfirmationDialog = () => {
        this.setState({
            deleteDialogOpen: false,
        });
    }

    confirmDelete = () => {
        this.closeDeleteConfirmationDialog();
        this.props.delete();
    }

    render = () => {
        const deleteDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDeleteConfirmationDialog}
            />,
            <RaisedButton
                primary
                label="Submit"
                keyboardFocused={true}
                style={{ marginLeft: 16 }}
                onClick={this.confirmDelete}
                buttonStyle={deleteButtonStyle}
            />
        ];

        return (
            <div style={buttonPanelStyle}>
                <Dialog
                    title={`Are you sure you want to delete "${this.props.job.name}"?`}
                    actions={deleteDialogActions}
                    open={this.state.deleteDialogOpen}
                    onRequestClose={this.closeDeleteConfirmationDialog}
                />
                <RaisedButton
                    primary
                    label={this.props.saveLabel}
                    onClick={this.props.save}
                    icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
                />
                { this.props.deleteLabel &&
                    <RaisedButton
                        primary
                        style={{ marginLeft: 16 }}
                        buttonStyle={deleteButtonStyle}
                        label={this.props.deleteLabel}
                        icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                        onClick={this.openDeleteConfirmationDialog}
                    />
                }
            </div>
        );
    }
}

export default JobActionPanel;