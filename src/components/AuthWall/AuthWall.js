import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Redirect } from 'react-router-dom'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useGetMe, selectors } from '../../hooks/me'

const AuthWall = ({ children }) => {
    const { loading, error, data } = useGetMe()

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                    {i18n.t('Checking permissions')}
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

    const isAuthorized = selectors.getAuthorized(data)

    if (!isAuthorized) {
        return <Redirect push to="/notauthorized" />
    }

    return <React.Fragment>{children}</React.Fragment>
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthWall
