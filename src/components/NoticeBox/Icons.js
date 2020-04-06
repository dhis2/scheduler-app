import React from 'react'
import { string } from '@dhis2/prop-types'

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

InfoIcon.propTypes = {
    className: string.isRequired,
}

const WarningIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
    >
        <path d="M2 42h44L24 4 2 42zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z" />
    </svg>
)

WarningIcon.propTypes = {
    className: string.isRequired,
}

const ErrorIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
    >
        <path d="M24 4C12.96 4 4 12.95 4 24s8.96 20 20 20 20-8.95 20-20S35.04 4 24 4zm2 30h-4v-4h4v4zm0-8h-4V14h4v12z" />
    </svg>
)

ErrorIcon.propTypes = {
    className: string.isRequired,
}

export { InfoIcon, WarningIcon, ErrorIcon }
