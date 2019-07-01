import React from 'react'
import { string, oneOf } from 'prop-types'

const Title = ({ children, priority }) => {
    const Heading = `h${priority}`

    return <Heading>{children}</Heading>
}

Title.defaultProps = {
    priority: 1,
}

Title.propTypes = {
    children: string.isRequired,
    priority: oneOf([1, 2, 3, 4, 5, 6]),
}

export default Title
