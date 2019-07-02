import React from 'react'
import { node } from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui-core'

const checkAuthorization = permissions => {
    if (!permissions) {
        return false
    }

    const isAuthorized =
        permissions.includes('ALL') ||
        permissions.includes('F_SCHEDULING_ADMIN')

    return isAuthorized
}

const AuthWall = ({ children }) => {
    const { loading, error, data } = useDataQuery({
        me: { resource: 'me' },
    })

    if (loading) {
        return <CircularLoader />
    }

    if (error) {
        return <span>{error.message}</span>
    }

    const isAuthorized = checkAuthorization(data.me.authorities)

    if (!isAuthorized) {
        return <span>You are not authorized</span>
    }

    return <React.Fragment>{children}</React.Fragment>
}

AuthWall.propTypes = {
    children: node.isRequired,
}

export default AuthWall
