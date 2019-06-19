import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const style = { width: '100%' };

const Date = ({ value, label, onChange }) => (
    <TimePicker
        textFieldStyle={style}
        format="24hr"
        hintText={label}
        value={value || null}
        onChange={(event, change) => onChange(change)}
    />
);

export default Date;
