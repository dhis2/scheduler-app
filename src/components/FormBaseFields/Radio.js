import React from 'react'
import { object } from 'prop-types'
import { Radio as CoreRadio } from '@dhis2/ui-core'

const Radio = ({ input, ...rest }) => {
    return <CoreRadio {...input} {...rest} />
}

Radio.propTypes = {
    input: object.isRequired,
}

export default Radio
