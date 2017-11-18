import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import cronExpressions from 'constants/cronExpressions';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    selectField: {
        marginRight: 32,
    }
}

const CronExpression = ({ value, onChange, error }) => {
    const selectedCron = cronExpressions.find(cron => cron.value === value);
    const selectedCronText = selectedCron ? selectedCron.value : '';
    
    const onCronSelected = (e, i, value) => {
        onChange(value);
    }

    const onCronChanged = (e, value) => {
        onChange(value);
    }
    
    return (
        <div>
            <div style={styles.container}>
                <SelectField
                    fullWidth
                    floatingLabelFixed
                    value={selectedCronText}
                    style={styles.selectField}
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
                    fullWidth
                    value={value}
                    floatingLabelText="Cron expression *"
                    onChange={onCronChanged}
                    errorText={error}
                />
            </div>
        </div>
    );
}

export default CronExpression;