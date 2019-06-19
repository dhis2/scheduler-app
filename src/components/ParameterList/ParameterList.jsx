import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { connect } from 'react-redux';
import Heading from '../Heading';
import Parameter from './Parameter';

const styles = {
  header: {
      paddingTop: 24,
      paddingLeft: 0,
  },
};

const ParameterList = ({ type, handleParameterChange, parameterMap, values, attributeOptions }) => {
    // As long as there's no type selected we don't need to render anything
    if (!type) {
        return null;
    }

    const parameters = parameterMap[type];

    // If there's a type but no matching parameter object, the type is invalid
    if (!parameters) {
        return <div>Invalid parameter type</div>;
    }

    const parameterKeys = Object.keys(parameters);
    const hasParameters = parameterKeys.length > 0;

    // If the job type has no parameters to set, we don't need to render anything either
    if (!hasParameters) {
      return null;
    }

    // Get any available options for dropdown lists
    const availableOptions = attributeOptions[type];

    return (
        <div>
            <Heading style={styles.header}>{i18n.t('Parameters')}</Heading>
            {parameterKeys.map(key => (
                <Parameter
                    key={key}
                    options={availableOptions ? availableOptions[key] : []}
                    value={values[key]}
                    parameter={parameters[key]}
                    handleParameterChange={value => handleParameterChange({ [key]: value })}
                />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    parameterMap: state.jobs.configuration.parameters,
    attributeOptions: state.jobs.configuration.attributeOptions,
});

export default connect(mapStateToProps)(ParameterList);
