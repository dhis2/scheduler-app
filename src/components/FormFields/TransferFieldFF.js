import React, { useCallback } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Help, InputFieldFF, Transfer } from '@dhis2/ui'

const TransferFieldFF = ({
    input,
    meta,
    options = [],
    hidden,
    renderOption,
    selectedEmptyComponent,
    className,
}) => {
    const handleChange = useCallback(
        ({ selected }) => {
            input?.onChange(selected)
        },
        [input]
    )

    if (hidden) {
        return null
    }

    const isErr = meta?.touched && meta?.invalid

    return (
        <>
            <Transfer
                options={options}
                onChange={handleChange}
                selected={input?.value || []}
                renderOption={renderOption}
                maxSelections={Infinity}
                enableOrderChange={true}
                filterable={true}
                height={'450px'}
                selectedEmptyComponent={selectedEmptyComponent}
                className={className}
            />
            {isErr && <Help error>{meta.error}</Help>}
        </>
    )
}

TransferFieldFF.propTypes = {
    ...InputFieldFF.propTypes,
    className: PropTypes.string,
    renderOption: Transfer.propTypes.renderOption,
    selectedEmptyComponent: Transfer.propTypes.selectedEmptyComponent,
}

export default TransferFieldFF
