import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

const InfoIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
    >
        <path d="M0 0h48v48H0z" fill="none" />
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z" />
    </svg>
)

InfoIcon.defaultProps = {
    className: '',
}

const { string } = PropTypes

InfoIcon.propTypes = {
    className: string,
}

export default InfoIcon
