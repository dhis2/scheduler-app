import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import i18next from 'i18next';

const styles = {
    buttonPanel: {
        marginTop: 24,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    noWrap: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    buttons: {
        marginRight: 8,
        marginLeft: 8,
    },
};

class ActionButtons extends Component {
    state = { deleteDialogOpen: false };

    getPendableIcon = (icon, isPending) =>
        isPending ? (
            <CircularProgress size={24} />
        ) : (
            <FontIcon className="material-icons">{icon}</FontIcon>
        );

    toggleDeleteDialog = open => {
        this.setState({
            deleteDialogOpen: open,
        });
    };

    closeDeleteDialog = () => {
        this.toggleDeleteDialog(false);
    };
    openDeleteDialog = () => {
        this.toggleDeleteDialog(true);
    };

    confirmDelete = () => {
        this.closeDeleteDialog();
        this.props.delete.submit();
    };

    render = () => {
        const deleteDialogActions = [
            <FlatButton primary label={i18next.t('cancel')} onClick={this.closeDeleteDialog} />,
            <RaisedButton
                secondary
                label={i18next.t('delete')}
                style={{ marginLeft: 16 }}
                onClick={this.confirmDelete}
            />,
        ];

        return (
            <div style={styles.buttonPanel}>
                <Dialog
                    title={`${i18next.t('are_you_sure_you_want_to_delete')} "${
                        this.props.job.name
                    }"?`}
                    actions={deleteDialogActions}
                    open={this.state.deleteDialogOpen}
                    onRequestClose={this.closeDeleteDialog}
                />
                <RaisedButton
                    primary
                    style={{ ...styles.buttons, ...styles.noWrap }}
                    disabled={this.props.update.disabled}
                    label={this.props.update.label}
                    onClick={this.props.update.submit}
                    icon={this.getPendableIcon('cloud_upload', this.props.update.pending)}
                />
                {this.props.delete.submit && (
                    <RaisedButton
                        secondary
                        style={{ ...styles.buttons, ...styles.noWrap }}
                        disabled={this.props.delete.disabled}
                        label={this.props.delete.label}
                        icon={this.getPendableIcon('delete_forever', this.props.delete.pending)}
                        onClick={this.openDeleteDialog}
                    />
                )}
            </div>
        );
    };
}

ActionButtons.propTypes = {
    job: PropTypes.object.isRequired,
    update: PropTypes.shape({
        submit: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        pending: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
    }).isRequired,
    delete: PropTypes.shape({
        submit: PropTypes.func,
        label: PropTypes.string,
        pending: PropTypes.bool,
        disabled: PropTypes.bool,
    }),
};

ActionButtons.defaultProps = {
    job: {},
    update: {},
    delete: {},
};

export default ActionButtons;
