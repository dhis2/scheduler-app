import React from 'react'
import { arrayOf, shape, func, string } from 'prop-types'
import { Radio } from '@dhis2/ui-core'

const RadioGroup = ({ name, options, selected, setSelected }) => {
    return (
        <React.Fragment>
            {options.map(({ value, label }) => (
                <Radio
                    key={value}
                    label={label}
                    name={name}
                    onChange={event => setSelected(event.target.value)}
                    value={value}
                    checked={selected === value}
                />
            ))}
        </React.Fragment>
    )
}

RadioGroup.propTypes = {
    name: string.isRequired,
    options: arrayOf(
        shape({
            value: string.isRequired,
            label: string.isRequired,
        })
    ).isRequired,
    selected: string.isRequired,
    setSelected: func.isRequired,
}

export default RadioGroup
