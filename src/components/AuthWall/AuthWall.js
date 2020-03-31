import React from 'react'
import { node } from 'prop-types'
import { CircularLoader } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { useGetMe, selectors } from '../../hooks/me'
import { AbsoluteCenter } from '../AbsoluteCenter'
import { FullscreenError } from '../Errors'

const AuthWall = ({ children }) => {
    const { loading, error, data } = useGetMe()

    if (loading) {
        return (
            <AbsoluteCenter vertical>
                <CircularLoader />
                {i18n.t('Checking permissions')}
            </AbsoluteCenter>
        )
    }

    if (error) {
        return <FullscreenError message={error.message} />
    }

    const isAuthorized = selectors.getAuthorized(data)

    if (!isAuthorized) {
        return <FullscreenError message={i18n.t('You are not authorized')} />
    }

    return <React.Fragment>{children}</React.Fragment>
}

AuthWall.propTypes = {
    children: node.isRequired,
}

export default AuthWall
