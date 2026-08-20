import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

const LinkButton = ({ className, small, ...rest }) => {
    return (
        <Link
            className={cx(
                styles.linkButton,
                { [styles.small]: small },
                className
            )}
            {...rest}
        />
    )
}

const { string, bool } = PropTypes

LinkButton.propTypes = {
    className: string,
    small: bool,
}

export default LinkButton
