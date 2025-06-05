import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import StoreContext from './StoreContext'

const Store = ({ children }) => {
    // State that should persist
    const [nameFilter, setNameFilter] = useState('')
    const [showSystemJobs, setShowSystemJobs] = useState(false)

    const value = useMemo(
        () => ({
            nameFilter,
            setNameFilter,
            showSystemJobs,
            setShowSystemJobs,
        }),
        [nameFilter, setNameFilter, showSystemJobs, setShowSystemJobs]
    )

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}

const { node } = PropTypes

Store.propTypes = {
    children: node.isRequired,
}

export default Store
