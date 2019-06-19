import React from 'react';
import TextField from 'material-ui/TextField';

const Text = ({ value, label, onChange }) => (
    <TextField
        fullWidth
        value={value || ''}
        floatingLabelText={label}
        type="text"
        onChange={(event, change) => onChange(change)}
    />
);

export default Text;
