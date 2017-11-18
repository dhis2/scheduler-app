import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import cronExpressions from 'constants/cronExpressions';

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
}

const appendRequiredSign = (label, required) => required ? `${label} *` : label;

const Schedule = ({
    cronExpression,
    continuousExecution,
    onCronExpressionChange,
    onContinuousExecutionChange,
    error,
}) => {
    const selectedCron = cronExpressions.find(cron => cron.value === cronExpression);
    const selectedCronText = selectedCron ? selectedCron.value : '';
    
    const onCronSelected = (e, i, value) => {
        onChange(value);
    }

    const onCronChanged = (e, value) => {
        onCronExpressionChange(value);
    }
    
    return (
        <div style={styles.container}>
            <SelectField
                disabled={continuousExecution}
                floatingLabelFixed
                style={styles.flexItem}
                value={selectedCronText}
                onChange={onCronSelected}
                floatingLabelText="Select frequency"
            >
                { cronExpressions.map((option, index) => (
                    <MenuItem
                        key={option.value + index}
                        value={option.value}
                        primaryText={option.text}
                    />
                ))}
            </SelectField>
            <TextField
                disabled={continuousExecution}
                style={styles.flexItem}
                value={cronExpression}
                floatingLabelText={appendRequiredSign("Cron expression", !continuousExecution)}
                onChange={onCronChanged}
                errorText={error}
            />
            <div style={{ ...styles.flexItem, ...styles.toggle }}>
            <Toggle
                label="Continuous Execution"
                defaultToggled={continuousExecution}
                onToggle={onContinuousExecutionChange}
            />
            </div>
        </div>
    );
}

export default Schedule;