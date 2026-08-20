import React from 'react'
import PropTypes from 'prop-types'
import s from './QueueTransferTitle.module.css'

const QueueTransferTitle = ({ title }) => <h4 className={s.header}>{title}</h4>

const { string } = PropTypes

QueueTransferTitle.propTypes = {
    title: string.isRequired,
}

export default QueueTransferTitle
