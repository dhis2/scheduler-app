import React, { Component } from 'react';
import Heading from 'd2-ui/lib/headings/Heading.component';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import { compose, withProps, branch, renderNothing } from 'recompose';

import SuggestionList from 'components/jobParameters/SuggestionList';
import OpenList from 'components/jobParameters/OpenList';
import { parseParameters } from 'api/api';
import { COMPONENTS, PARAMS } from 'api/bridge';

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

const getComponentToRender = (key, parameter, changeHandler) => {
    const { label, type, itemType, options, renderAs } = parameter.meta;
    const value = parameter.value;

    switch (renderAs) {
        case COMPONENTS.INPUT:
            return (
                <TextField
                    fullWidth
                    value={value || ''}
                    floatingLabelText={label}
                    type={type === PARAMS.INTEGER ? 'number' : 'text'}
                    onChange={handleParameterEvent(changeHandler, key)}
                /> 
            );
            
        case COMPONENTS.INPUT_LIST:
            return (
                <OpenList
                    label={label}
                    values={value}
                    onChange={selected => {
                        changeHandler(key, selected);
                    }}
                /> 
            );
            
        case COMPONENTS.SELECTION:
            const onChange = (event, index, values) => changeHandler(key, values, false);
            return (
                <SelectField
                    multiple
                    fullWidth
                    hintText={'Click to select'}
                    value={value}
                    onChange={onChange}
                    floatingLabelText={label}
                >
                    {createAttributeOptionSelectionList(value, options)}
                </SelectField> 
            );
            
        case COMPONENTS.SUGGESTION:
            return (
              <div>Not supported</div>  
            );
            
        case COMPONENTS.SUGGESTION_LIST:
            return (
                <SuggestionList
                    label={label}
                    selected={value}
                    suggestions={options}
                    onChange={selected => {
                        changeHandler(key, selected);
                    }}
                />
            );
            
        case COMPONENTS.TOGGLE:
            return (
                <Toggle
                    style={styles.toggle}
                    defaultToggled={value}
                    label={label}
                    onToggle={handleParameterEvent(changeHandler, key)}
                />
            );
            
        case COMPONENTS.DATE:
            return (
                <TimePicker
                    textFieldStyle={styles.timePicker}
                    format="24hr"
                    hintText={label}
                />
            );
            
        case COMPONENTS.PERIOD:
            return (
                <div>
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

        default:
            return (
                <div>{renderAs} not yet supported</div>
            )
    }
}

const Parameters = props => {
    const paramKeys = Object.keys(props.parameters);
    const parametersToRender = paramKeys.map(key => (
        <div key={key}>
            {getComponentToRender(key, props.parameters[key], props.onParameterChange)}
        </div>
    ));

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

export default enhance(Parameters);