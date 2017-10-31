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

import { paramTypes } from 'constants/paramTypes';
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
    changeHandler(key, newValue);

const JobParameters = props => {
    const paramKeys = Object.keys(props.parameters);
    const parametersToRender = paramKeys.map(key => {
        const param = props.parameters[key];
        const { label, type } = param.meta;

        // TODO: Handle lists of parameters
        switch(type) {
            case paramTypes.INTEGER:
            case paramTypes.STRING:
                return (
                    <TextField
                        fullWidth
                        key={key}
                        value={param.value || ''}
                        floatingLabelText={label}
                        type={type === paramTypes.INTEGER ? 'number' : 'text'}
                        onChange={handleParameterEvent(props.onParameterChange, key)}
                    />
                );

            case paramTypes.BOOLEAN:
                return (
                    <Toggle
                        style={styles.toggle}
                        key={key}
                        defaultToggled={param.value}
                        label={label}
                        onToggle={handleParameterEvent(props.onParameterChange, key)}
                    />
                );

            case paramTypes.PERIOD: // FIXME
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

            default: return label;
        }
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
const enhance = compose(
    withProps(props => {
        const parameters = parseParameters(
            props.availableParameters[props.type],
            props.parameters,
        );

        const onParameterChange = (fieldName, newValue) => {
            props.onChange({
                ...props.parameters,
                [fieldName]: newValue,
            })
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