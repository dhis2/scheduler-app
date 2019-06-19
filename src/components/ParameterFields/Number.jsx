import React from 'react';
import TextField from 'material-ui/TextField';

const Number = ({ value, label, onChange }) => (
    <TextField
        fullWidth
        value={value || ''}
        floatingLabelText={label}
        type="number"
        onChange={(event, change) => onChange(change)}
    />
);

export default Number;
