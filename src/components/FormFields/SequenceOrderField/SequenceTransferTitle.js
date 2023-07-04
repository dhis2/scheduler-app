import React from 'react'
import PropTypes from 'prop-types'
import s from './SequenceTransferTitle.module.css'

const SequenceTransferTitle = ({ title }) => (
    <h4 className={s.header}>{title}</h4>
)

SequenceTransferTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SequenceTransferTitle
