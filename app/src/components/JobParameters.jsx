import React, { Component } from 'react';
import Heading from 'd2-ui/lib/headings/Heading.component';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import { compose, withProps, branch, renderNothing } from 'recompose';

import { paramTypes as params } from 'constants/paramTypes';
import { parseParameters } from 'api/api';

const styles = {
    header: {
        paddingTop: 24,
        paddingBottom: 16,
    },
    toggle: { paddingTop: 20, paddingBottom: 20 },
    timePicker: { width: '100%' },
};

const handleParameterEvent = (changeHandler, key) => (event, newValue) =>
    changeHandler(key, newValue, false);

const createAttributeOptionSelectionList = (values, options) =>
    options.map(option => 
        <MenuItem
            key={option}
            insetChildren
            checked={values && (values.indexOf(option) > -1) ? true : false}
            value={option}
            primaryText={option}
        />
    );

const shouldRenderTextField = type =>
    (type === params.INTEGER || type === params.STRING);

const shouldRenderAutoComplete = (type, itemType) =>
    (type === params.LIST) &&
    (itemType === params.STRING || itemType === params.INTEGER || itemType === params.OBJECT)

const shouldRenderSelectField = (type, itemType) => 
    type === params.SET && (itemType === params.INTEGER || itemType === params.STRING);

const shouldRenderToggle = type => type === params.BOOLEAN;
const shouldRenderPeriod = type => type === params.PERIOD;

const JobParameters = props => {
    const paramKeys = Object.keys(props.parameters);
    const parametersToRender = paramKeys.map(key => {
        const param = props.parameters[key];
        const { label, type, itemType, options } = param.meta;

        if (shouldRenderTextField(type)) {
            return (
                <TextField
                    fullWidth
                    key={key}
                    value={param.value || ''}
                    floatingLabelText={label}
                    type={type === params.INTEGER ? 'number' : 'text'}
                    onChange={handleParameterEvent(props.onParameterChange, key)}
                />
            );
        }

        if (shouldRenderAutoComplete(type, itemType)) {
            return (
                <div key={key}>{label}: AUTOCOMPLETE NOT YET SUPPORTED</div>
            );
        }

        if (shouldRenderSelectField(type, itemType)) {
            const onChange = (event, index, values) => props.onParameterChange(key, values, false);
            return (
                <SelectField
                    key={key}
                    multiple
                    fullWidth
                    hintText={'Click to select'}
                    value={param.value}
                    onChange={onChange}
                    floatingLabelText={label}
                >
                    {createAttributeOptionSelectionList(param.value, options)}
                </SelectField> 
            );
        }

        if (shouldRenderToggle(type)) {
            return (
                <Toggle
                    style={styles.toggle}
                    key={key}
                    defaultToggled={param.value}
                    label={label}
                    onToggle={handleParameterEvent(props.onParameterChange, key)}
                />
            );
        }

        if (shouldRenderPeriod(type)) {
            // Check if list
            return (
                <div key={key}>
                    <Heading level={4}>{label}</Heading>
                    <TimePicker
                        textFieldStyle={styles.timePicker}
                        format="24hr"
                        hintText="Start time"
                    />
                    <TimePicker
                        textFieldStyle={styles.timePicker}
                        format="24hr"
                        hintText="End time"
                    />
                </div>
            );
        }

        return (
            <div key={key}>{label}:Combination of type {type} and itemType {itemType} not supported.</div>
        );
    });

    return (
        <div>
            <Heading style={styles.header}>
                Parameters
            </Heading>
            {parametersToRender}
        </div>
    );
}

const noParameters = ({ parameters }) => Object.keys(parameters).length < 1;
const missingProps = ({ parameters, attributeOptions }) => 
       (parameters && Object.keys(parameters).length < 1)
    || Object.keys(attributeOptions).length < 1;

const enhance = compose(
    branch(
        missingProps,
        renderNothing,
    ),
    withProps(props => {
        const parameters = parseParameters(
            props.availableParameters[props.type],
            props.parameters,
            props.attributeOptions[props.type],
        );

        const separateByComma = value => value.split(',').map(s => s.trim());
        const onParameterChange = (fieldName, newValue, collection) => {
            props.onChange({
                ...props.parameters,
                [fieldName]: collection
                    ? separateByComma(newValue)
                    : newValue,
            });
        }

        return {
            parameters,
            onParameterChange,
        }
    }),
    branch(
        noParameters,
        renderNothing,
    ),
);

export default enhance(JobParameters);