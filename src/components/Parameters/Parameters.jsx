import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import i18n from '@dhis2/d2-i18n';

import { parseParameters } from '../../api/api';
import { COMPONENTS, PARAMS } from '../../api/interface';
import Heading from '../Heading';
import Suggestion from './Suggestion';
import SuggestionList from './SuggestionList';
import InputList from './InputList';

const styles = {
    header: {
        paddingTop: 24,
    },
    toggle: { paddingTop: 20, paddingBottom: 20 },
    timePicker: { width: '100%' },
};

const handleParameterEvent = (changeHandler, key) => (event, newValue) =>
    changeHandler(key, newValue, false);

const createAttributeOptionSelectionList = (values, options) =>
    options.map(option => (
        <MenuItem
            key={option}
            insetChildren
            checked={values && values.indexOf(option) > -1}
            value={option}
            primaryText={i18n.t(option)}
        />
    ));

const getComponentToRender = (key, parameter, changeHandler) => {
    const { type, options, renderAs } = parameter.meta;
    const label = i18n.t(parameter.meta.label);
    const value = parameter.value;

    const onChangeHandler = selected => {
        changeHandler(key, selected);
    };

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
            return <InputList label={label} values={value} onChange={onChangeHandler} />;

        case COMPONENTS.SELECTION: {
            const onChange = (event, index, values) => changeHandler(key, values, false);

            const translateStrings = values =>
                values.map(
                    (v, i) => (i === values.length - 1 ? `${i18n.t(v)}` : `${i18n.t(v)}, `),
                );

            return (
                <SelectField
                    multiple
                    fullWidth
                    hintText={i18n.t('Click to select')}
                    value={value}
                    selectionRenderer={translateStrings}
                    onChange={onChange}
                    floatingLabelText={label}
                >
                    {createAttributeOptionSelectionList(value, options)}
                </SelectField>
            );
        }

        case COMPONENTS.SUGGESTION:
            return (
                <Suggestion
                    label={label}
                    selected={value}
                    suggestions={options}
                    onChange={onChangeHandler}
                />
            );

        case COMPONENTS.SUGGESTION_LIST:
            return (
                <SuggestionList
                    label={label}
                    selected={value}
                    suggestions={options}
                    onChange={onChangeHandler}
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
            return <TimePicker textFieldStyle={styles.timePicker} format="24hr" hintText={label} />;

        case COMPONENTS.PERIOD:
            return (
                <div>
                    <TimePicker
                        textFieldStyle={styles.timePicker}
                        format="24hr"
                        hintText={i18n.t('Start time')}
                    />
                    <TimePicker
                        textFieldStyle={styles.timePicker}
                        format="24hr"
                        hintText={i18n.t('End time')}
                    />
                </div>
            );

        default:
            return null;
    }
};

const Parameters = ({ type, parameters, availableParameters, attributeOptions, onChange }) => {
    const parsedParameters = parseParameters(
        availableParameters[type],
        parameters,
        attributeOptions[type],
    );

    const separateByComma = value => value.split(',').map(s => s.trim());
    const onParameterChange = (fieldName, newValue, collection) => {
        onChange({
            ...parsedParameters,
            [fieldName]: collection ? separateByComma(newValue) : newValue,
        });
    };

    const noParameters = Object.keys(parsedParameters).length < 1;
    const missingProps = (parsedParameters && Object.keys(parsedParameters).length < 1) || Object.keys(attributeOptions).length < 1;

    if (noParameters || missingProps) {
        return null;
    }

    const paramKeys = Object.keys(parsedParameters);
    const parametersToRender = paramKeys.map(key => (
        <div key={key}>
            {getComponentToRender(key, parsedParameters[key], onParameterChange)}
        </div>
    ));

    return (
        <div>
            <Heading style={styles.header}>{i18n.t('Parameters')}</Heading>
            {parametersToRender}
        </div>
    );
};

export default Parameters;
