import React from 'react';
import i18n from '@dhis2/d2-i18n';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import { blue400, cyan400, amber400, pinkA200 } from 'material-ui/styles/colors';

import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Heading from '../Heading';

const dateAndTime = 'DD.MM.YYYY HH:mm:ss';

const styles = {
    detailsHeader: {
        paddingTop: 24,
        paddingBottom: 16,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: -16,
        marginRight: -16,
    },
    flexItem: {
        flex: '1 0 auto',
        marginLeft: 16,
        marginRight: 16,
    },
};

const EXECUTION_SUCCESS = 'COMPLETED';
const EXECUTION_FAILURE = 'FAILED';

const getExecutionColor = status => {
    switch (status) {
        case EXECUTION_SUCCESS:
            return cyan400;
        case EXECUTION_FAILURE:
            return pinkA200;
        default:
            return amber400;
    }
};

const getExecutionIcon = status => {
    switch (status) {
        case EXECUTION_SUCCESS:
            return 'check';
        case EXECUTION_FAILURE:
            return 'clear';
        default:
            return 'assignment_late';
    }
};

const Details = ({ createdOn, lastExecuted, lastExecutedStatus }) => (
    <div>
        <Heading style={styles.detailsHeader}>{i18n.t('Details')}</Heading>
        <div style={styles.container}>
            <ListItem
                disabled
                style={styles.flexItem}
                leftAvatar={
                    <Avatar
                        icon={<FontIcon className="material-icons">create</FontIcon>}
                        backgroundColor={blue400}
                    />
                }
                primaryText={i18n.t('Created')}
                secondaryText={moment(createdOn).format(dateAndTime)}
            />
            {lastExecuted && (
                <ListItem
                    disabled
                    style={styles.flexItem}
                    leftAvatar={
                        <Avatar
                            icon={<FontIcon className="material-icons">event</FontIcon>}
                            backgroundColor={blue400}
                        />
                    }
                    primaryText={i18n.t('Last executed')}
                    secondaryText={moment(lastExecuted).format(dateAndTime)}
                />
            )}

            {lastExecuted && (
                <ListItem
                    disabled
                    style={styles.flexItem}
                    leftAvatar={
                        <Avatar
                            icon={
                                <FontIcon className="material-icons">
                                    {getExecutionIcon(lastExecutedStatus)}
                                </FontIcon>
                            }
                            backgroundColor={getExecutionColor(lastExecutedStatus)}
                        />
                    }
                    primaryText={i18n.t('Last execution status')}
                    secondaryText={i18n.t(lastExecutedStatus)}
                />
            )}
        </div>
    </div>
);

export default Details;
