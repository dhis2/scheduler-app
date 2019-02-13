import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import { compose, withProps, branch, renderNothing } from 'recompose';
import i18n from '@dhis2/d2-i18n';

import Suggestion from 'components/jobParameters/Suggestion';
import SuggestionList from 'components/jobParameters/SuggestionList';
import InputList from 'components/jobParameters/InputList';
import { parseParameters } from 'api/api';
import { COMPONENTS, PARAMS } from 'api/interface';
import Heading from '../Heading';

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

const Parameters = props => {
    const paramKeys = Object.keys(props.parameters);
    const parametersToRender = paramKeys.map(key => (
        <div key={key}>
            {getComponentToRender(key, props.parameters[key], props.onParameterChange)}
        </div>
    ));

    return (
        <div>
            <Heading style={styles.header}>{i18n.t('Parameters')}</Heading>
            {parametersToRender}
        </div>
    );
};

const noParameters = ({ parameters }) => Object.keys(parameters).length < 1;
const missingProps = ({ parameters, attributeOptions }) =>
    (parameters && Object.keys(parameters).length < 1) || Object.keys(attributeOptions).length < 1;

const enhance = compose(
    branch(missingProps, renderNothing),
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
                [fieldName]: collection ? separateByComma(newValue) : newValue,
            });
        };

        return {
            parameters,
            onParameterChange,
        };
    }),
    branch(noParameters, renderNothing),
);

export default enhance(Parameters);
