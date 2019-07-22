import React from 'react'
import { AbsoluteCenter } from '../AbsoluteCenter'
import InlineError from './InlineError'

const FullscreenError = props => (
    <AbsoluteCenter>
        <InlineError {...props} />
    </AbsoluteCenter>
)

export default FullscreenError
