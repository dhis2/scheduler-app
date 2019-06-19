import React from 'react';
import * as Fields from '../ParameterFields';

const componentMap = {
    'java.lang.Integer': Fields.Number,
    'java.lang.String': Fields.Text,
    'java.lang.Boolean': Fields.Checkbox,
    'java.util.Date': Fields.Date,
    'java.util.Set': Fields.MultiSelect,
    'java.util.List': Fields.AutoCompleteSelect,

    // Seem unused
    'org.hisp.dhis.period.Period': () => <div>Period</div>,
    'org.hisp.dhis.validation.ValidationRuleGroup': () => <div>ValidationRuleGroup</div>,
    'org.hisp.dhis.organisationunit.OrganisationUnit': () => <div>OrganisationUnit</div>,
};

const Parameter = ({ value, parameter, options, handleParameterChange }) => {
    const Field = componentMap[parameter.klass];
    const label = parameter.fieldName;

    return <Field options={options} value={value} label={label} onChange={handleParameterChange} />;
};

export default Parameter;
