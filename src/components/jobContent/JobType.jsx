import { useSelector } from 'react-redux'
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import i18n from '@dhis2/d2-i18n';

const getJobTypes =
    state => state.jobs.configuration.types

const getJobTypeNames =
    state => state.jobs.configuration.jobTypeNames

const JobType = ({
    disabled,
    value,
    onChange,
    errorText,
}) => {
    const jobTypeNames = useSelector(getJobTypeNames)
    const jobTypes = useSelector(getJobTypes)

    return (
        <SelectField
            fullWidth
            disabled={disabled}
            floatingLabelText={`${i18n.t('Job type')} *`}
            value={value}
            onChange={onChange}
            errorText={errorText}
        >
            {jobTypes.map(type => (
                <MenuItem
                    key={type}
                    value={type}
                    primaryText={jobTypeNames[type]}
                />
            ))}
        </SelectField>
    )
}

export default JobType
