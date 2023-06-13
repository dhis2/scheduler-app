import React from 'react'
import PropTypes from 'prop-types'

const headerStyle = {
    margin: '0.5em 0',
    fontWeight: 500,
}

const SequenceTransferTitle = ({ title }) => (
    <h4 style={headerStyle}>{title}</h4>
)

SequenceTransferTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SequenceTransferTitle
