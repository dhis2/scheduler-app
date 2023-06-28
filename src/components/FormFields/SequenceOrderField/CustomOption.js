import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './CustomOption.module.css'

const { bool, func, string } = PropTypes

const CustomOption = ({
    label,
    value,
    type,
    onClick,
    highlighted,
    onDoubleClick,
}) => {
    const className = cx(styles.wrapper, { [styles.highlighted]: highlighted })

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
        <div
            onClick={(event) => onClick({ label, value }, event)}
            onDoubleClick={(event) => onDoubleClick({ label, value }, event)}
            className={className}
            data-value={value}
            data-test="dhis2-uicore-transferoption"
        >
            <div className={styles.label}>{label}</div>
            <div className={styles.type}>{type}</div>
        </div>
    )
}

CustomOption.propTypes = {
    highlighted: bool.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    value: string.isRequired,
    onClick: func.isRequired,
    onDoubleClick: func.isRequired,
}

export default CustomOption
