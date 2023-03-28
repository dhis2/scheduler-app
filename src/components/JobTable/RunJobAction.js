import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { RunJobModal } from '../Modal'

const RunJobAction = ({ id, enabled }) => {
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
                />
            )}
        </React.Fragment>
    )
}

const { string, bool } = PropTypes

RunJobAction.propTypes = {
    id: string.isRequired,
    enabled: bool,
}

export default RunJobAction
