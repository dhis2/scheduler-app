import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

const styles = {
    deleteButton: {
        backgroundColor: 'tomato',
    },
    buttonPanel: {
        marginTop: 24,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
}

class JobActionPanel extends Component {
    state = { deleteDialogOpen: false }
    toggleDeleteDialog = open => () => {
        this.setState({
            deleteDialogOpen: open,
        });
    }

    closeDeleteDialog = () => { this.toggleDeleteDialog(false); }
    openDeleteDialog = () => { this.toggleDeleteDialog(true); }

    confirmDelete = () => {
        this.closeDeleteDialog();
        this.props.delete();
    }

    render = () => {
        const deleteDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDeleteDialog}
            />,
            <RaisedButton
                primary
                label="Submit"
                style={{ marginLeft: 16 }}
                onClick={this.confirmDelete}
                buttonStyle={styles.deleteButton}
            />
        ];

        return (
            <div style={styles.buttonPanel}>
                <Dialog
                    title={`Are you sure you want to delete "${this.props.job.name}"?`}
                    actions={deleteDialogActions}
                    open={this.state.deleteDialogOpen}
                    onRequestClose={this.closeDeleteDialog}
                />
                <RaisedButton
                    primary
                    disabled={this.props.disableSave}
                    label={this.props.saveLabel}
                    onClick={this.props.save}
                    icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
                />
                { this.props.deleteLabel &&
                    <RaisedButton
                        primary
                        style={{ marginLeft: 16 }}
                        buttonStyle={styles.deleteButton}
                        label={this.props.deleteLabel}
                        icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                        onClick={this.openDeleteDialog}
                    />
                }
            </div>
        );
    }
}

export default JobActionPanel;