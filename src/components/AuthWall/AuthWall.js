import React from 'react'
import { node } from '@dhis2/prop-types'
import { Redirect } from 'react-router-dom'
import { CircularLoader, ScreenCover } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { useGetMe, selectors } from '../../hooks/me'

const AuthWall = ({ children }) => {
    const { loading, error, data } = useGetMe()

    if (loading) {
        return (
            <ScreenCover>
                <div>
                    <CircularLoader />
                </div>
                {i18n.t('Checking permissions')}
            </ScreenCover>
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
    children: node.isRequired,
}

export default AuthWall
