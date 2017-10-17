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

import { paramTypes } from 'constants/paramTypes';

class JobParameters extends Component {
    render() {
        if (!this.props.parameters || this.props.parameters.length < 1) {
            return <div>No parameters for this job type.</div>;
        }

        const parametersToRender = this.props.parameters.map(param => {
            // Todo: Render list if param.collection
            switch(param.type) {
                case paramTypes.INTEGER:
                case paramTypes.STRING:
                    return (
                        <TextField
                            fullWidth
                            key={param.apiName}
                            defaultValue={param.value}
                            floatingLabelText={param.label}
                            type={param.type === paramTypes.INTEGER ? 'number' : 'text'}
                        />
                    );
    
                case paramTypes.BOOLEAN:
                    return (
                        <Toggle
                            style={{ paddingTop: 20, paddingBottom: 20 }}
                            key={param.apiName}
                            defaultToggled={param.value}
                            label={param.label}
                            onToggle={() => {}}
                        />
                    );

                case paramTypes.PERIOD:
                    return (
                        <div key={param.apiName}>
                            <Heading level={4}>{param.label}</Heading>
                            <TimePicker
                                textFieldStyle={{ width: '100%' }}
                                format="24hr"
                                hintText="Start time"
                            />
                            <TimePicker
                                textFieldStyle={{ width: '100%' }}
                                format="24hr"
                                hintText="End time"
                            />
                        </div>
                    );

                default: return param.label;
            }
        });
    
        return (
            <div>{parametersToRender}</div>
        );
    }
}

export default JobParameters;