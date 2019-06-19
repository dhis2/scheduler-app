import React from 'react';
import { string, func, node } from 'prop-types';
import TextField from 'material-ui/TextField';
import i18n from '@dhis2/d2-i18n';

const floatingLabelText = `${i18n.t('Name')} *`;

const Name = ({ value, onChange, errorText }) => (
    <TextField
        fullWidth
        value={value}
        floatingLabelText={floatingLabelText}
        onChange={onChange}
        errorText={errorText}
    />
);

Name.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    errorText: node,
};

export default Name;
