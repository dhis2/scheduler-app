import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { RunJobModal } from '../Modal'

const RunJobAction = ({ id, enabled, onComplete }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <MenuItem
                dense
                onClick={() => {
                    setShowModal(true)
                }}
                disabled={!enabled}
                label={i18n.t('Run manually')}
            />
            {showModal && (
                <RunJobModal
                    id={id}
                    hideModal={
                        /* istanbul ignore next */
                        () => setShowModal(false)
                    }
                    onComplete={onComplete}
                />
            )}
        </React.Fragment>
    )
}

const { string, bool, func } = PropTypes

RunJobAction.propTypes = {
    id: string.isRequired,
    onComplete: func.isRequired,
    enabled: bool,
}

export default RunJobAction
