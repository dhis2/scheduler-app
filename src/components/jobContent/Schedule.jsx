import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '@dhis2/d2-i18n';
import cronExpressions from '../../constants/cronExpressions';

const styles = {
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
    toggle: {
        marginBottom: 9,
        marginTop: 22,
    },
};

const appendRequiredSign = (label, required) => (required ? `${label} *` : label);

const Schedule = ({
    disabled,
    cronExpression,
    error,
    onCronExpressionChange,
}) => {
    const selectedCron = cronExpressions.find(cron => cron.value === cronExpression);
    const selectedCronText = selectedCron ? selectedCron.value : '';

    const onCronSelected = (e, i, value) => {
        onCronExpressionChange(e, value);
    };

    return (
        <div style={styles.container}>
            <SelectField
                disabled={disabled}
                floatingLabelFixed
                floatingLabelText={i18n.t('Select frequency')}
                onChange={onCronSelected}
                style={styles.flexItem}
                value={selectedCronText}
            >
                {cronExpressions.map(option => (
                    <MenuItem
                        key={option.value + option.text}
                        value={option.value}
                        primaryText={i18n.t(option.text)}
                    />
                ))}
            </SelectField>
            <TextField
                disabled={disabled}
                errorText={error}
                floatingLabelText={appendRequiredSign(i18n.t('Cron expression'))}
                onChange={onCronExpressionChange}
                style={styles.flexItem}
                value={cronExpression || ''}
            />
        </div>
    );
};

export default Schedule;
