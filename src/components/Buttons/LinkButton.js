import React from 'react'
import { func, node, string, oneOfType } from 'prop-types'
import styles from './LinkButton.module.css'

// List of the props that should not be passed on to the link
const filteredPropList = [
    'primary',
    'secondary',
    'destructive',
    'small',
    'large',
]

/**
 * Allows you to render react-router links, or regular links as buttons, so they look similar to
 * our buttons. Props that are used by the button will not be passed on to the link.
 */

const LinkButton = ({ as: Element, ...rest }) => {
    const classNames = [styles.wrapper]

    filteredPropList.forEach(prop => {
        if (rest[prop]) {
            classNames.push(styles[prop])
            delete rest[prop]
        }
    })

    return <Element className={classNames.join(' ')} {...rest} />
}

LinkButton.propTypes = {
    as: oneOfType([string, func]).isRequired,
    children: node.isRequired,
}

export default LinkButton
