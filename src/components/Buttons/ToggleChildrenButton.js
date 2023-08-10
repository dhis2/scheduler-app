import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'

const ToggleChildrenButton = ({ children, title, ...buttonProps }) => {
    const [childrenVisible, setChildrenVisible] = useState(false)

    const hideChildren = () => setChildrenVisible(false)
    const showChildren = () => setChildrenVisible(true)
    const toggleChildren = () => setChildrenVisible((prevState) => !prevState)

    return (
        <React.Fragment>
            <Button {...buttonProps} onClick={toggleChildren}>
                {title}
            </Button>
            {childrenVisible &&
                children({ showChildren, toggleChildren, hideChildren })}
        </React.Fragment>
    )
}

const { string, func } = PropTypes

ToggleChildrenButton.propTypes = {
    children: func.isRequired,
    title: string.isRequired,
}

export default ToggleChildrenButton
