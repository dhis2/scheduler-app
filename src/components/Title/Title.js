import React from 'react'
import { string, number } from 'prop-types'

const Title = ({ children, priority }) => {
    const Heading = `h${priority}`

    return <Heading>{children}</Heading>
}

Title.defaultProps = {
    priority: 1,
}

Title.propTypes = {
    children: string.isRequired,
    priority: number,
}

export default Title
