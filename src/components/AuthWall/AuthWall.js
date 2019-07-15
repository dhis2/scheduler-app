import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { node, func, string, bool } from 'prop-types'
import { CircularLoader } from '@dhis2/ui-core'
import { getMe } from '../../rootSelectors'
import { actions, selectors } from '../../data/me'
import { AbsoluteCenter } from '../AbsoluteCenter'

export const UnconnectedAuthWall = ({
    children,
    didFetch,
    errorMessage,
    isAuthorized,
    fetchMeIfNeeded,
}) => {
    useEffect(() => {
        fetchMeIfNeeded()
    }, [fetchMeIfNeeded])

    if (!didFetch) {
        return (
            <AbsoluteCenter vertical>
                <CircularLoader />
                Checking permissions
            </AbsoluteCenter>
        )
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    if (!isAuthorized) {
        return <span>You are not authorized</span>
    }

    return <React.Fragment>{children}</React.Fragment>
}

UnconnectedAuthWall.propTypes = {
    children: node.isRequired,
    didFetch: bool.isRequired,
    errorMessage: string.isRequired,
    isAuthorized: bool.isRequired,
    fetchMeIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    /* istanbul ignore next */
    const me = getMe(state)

    /* istanbul ignore next */
    return {
        didFetch: selectors.getDidFetch(me),
        errorMessage: selectors.getErrorMessage(me),
        isAuthorized: selectors.getIsAuthorized(me),
    }
}

const mapDispatchToProps = {
    fetchMeIfNeeded: actions.fetchMeIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedAuthWall)
