import React from 'react'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'

const Spinner = () => {
    return (
        <Layer>
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        </Layer>
    )
}

export default Spinner
