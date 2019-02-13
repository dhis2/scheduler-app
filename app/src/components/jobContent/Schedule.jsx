import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import cronExpressions from 'constants/cronExpressions';
import i18n from '@dhis2/d2-i18n';

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
    continuousExecution,
    cronExpression,
    error,
    onContinuousExecutionChange,
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
                disabled={continuousExecution || disabled}
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
                disabled={continuousExecution || disabled}
                errorText={error}
                floatingLabelText={appendRequiredSign(
                    i18n.t('Cron expression'),
                    !continuousExecution,
                )}
                onChange={onCronExpressionChange}
                style={styles.flexItem}
                value={cronExpression || ''}
            />
            <div style={{ ...styles.flexItem, ...styles.toggle }}>
                <Toggle
                    disabled={disabled}
                    label={i18n.t('Continuous execution')}
                    defaultToggled={continuousExecution}
                    onToggle={onContinuousExecutionChange}
                />
            </div>
        </div>
    );
};

export default Schedule;
