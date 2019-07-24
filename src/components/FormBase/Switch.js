import React from 'react'
import { string, object } from 'prop-types'
import { Switch as CoreSwitch } from '@dhis2/ui-core'

const Switch = ({ input, label }) => {
    return <CoreSwitch {...input} label={label} />
}

Switch.propTypes = {
    label: string.isRequired,
    input: object.isRequired,
}

export default Switch
