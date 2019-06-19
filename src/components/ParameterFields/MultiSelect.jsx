import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '@dhis2/d2-i18n';

const translateStrings = values => values.map(
    (val, i) => (i === values.length - 1 ? `${i18n.t(val)}` : `${i18n.t(val)}, `),
);

const MultiSelect = ({ value, label, onChange, options }) => (
    <SelectField
        multiple
        fullWidth
        hintText={i18n.t('Click to select')}
        value={value}
        selectionRenderer={translateStrings}
        onChange={(event, index, change) => onChange(change)}
        floatingLabelText={label}
    >
        {options.map(option => (
            <MenuItem
                key={option}
                insetChildren
                value={option}
                primaryText={i18n.t(option)}
            />
        ))}
    </SelectField>
);


export default MultiSelect;
