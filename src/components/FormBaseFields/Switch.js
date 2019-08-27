import React from 'react'
import { object } from 'prop-types'
import { Switch as CoreSwitch } from '@dhis2/ui-core'

const Switch = ({ input, ...rest }) => {
    return <CoreSwitch {...input} {...rest} />
}

Switch.propTypes = {
    input: object.isRequired,
}

export default Switch
