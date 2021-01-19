import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Redirect } from 'react-router-dom'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { getAuthorized } from './selectors'

const query = {
    me: {
        resource: 'me',
    },
}

const AuthWall = ({ children }) => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * know if the user is authorized, so throw the error.
         */
        throw error
    }

    const isAuthorized = getAuthorized(data.me)

    if (!isAuthorized) {
        return <Redirect push to="/notauthorized" />
    }

    return <React.Fragment>{children}</React.Fragment>
}

const { node } = PropTypes

AuthWall.propTypes = {
    children: node.isRequired,
}

export default AuthWall
