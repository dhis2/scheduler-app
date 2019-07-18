import React from 'react'
import { AbsoluteCenter } from '../AbsoluteCenter'
import InlineError from './InlineError'

const FatalError = props => (
    <AbsoluteCenter>
        <InlineError {...props} />
    </AbsoluteCenter>
)

export default FatalError
