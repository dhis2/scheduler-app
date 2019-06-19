import React from 'react';
import Toggle from 'material-ui/Toggle';

const style = { paddingTop: 20, paddingBottom: 20 };

const Checkbox = ({ value, label, onChange }) => (
    <Toggle
        style={style}
        toggled={value || false}
        label={label}
        onToggle={(event, change) => onChange(change)}
    />
);

export default Checkbox;
