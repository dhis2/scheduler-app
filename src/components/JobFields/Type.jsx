import React from 'react';
import { array, string, func } from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '@dhis2/d2-i18n';

const floatingLabelText = `${i18n.t('Job type')} *`;

const Type = ({ value, onChange, availableTypes }) => (
    <SelectField
        fullWidth
        floatingLabelText={floatingLabelText}
        value={value}
        onChange={onChange}
    >
        {availableTypes.map(type => (
            <MenuItem key={type} value={type} primaryText={i18n.t(type)} />
        ))}
    </SelectField>
);

Type.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    availableTypes: array.isRequired,
};

const mapStateToProps = state => ({
    availableTypes: state.jobs.configuration.types,
});

export default connect(mapStateToProps)(Type);
