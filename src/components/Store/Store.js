import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StoreContext from './StoreContext'

const Store = ({ children }) => {
    // State that should persist
    const nameFilterState = useState('')
    const showSystemJobsState = useState(false)

    return (
        <StoreContext.Provider
            value={{
                nameFilter: nameFilterState,
                showSystemJobs: showSystemJobsState,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

const { node } = PropTypes

Store.propTypes = {
    children: node.isRequired,
}

export default Store
