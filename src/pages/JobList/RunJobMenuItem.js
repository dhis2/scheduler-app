import React, { useState } from 'react'
import { string } from 'prop-types'
import { MenuItem } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { RunJobModal } from '../../components/Modal'

const RunJobMenuItem = ({ id }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <MenuItem
                dense
                onClick={() => {
                    setShowModal(true)
                }}
                label={i18n.t('Run manually')}
            />
            {showModal && (
                <RunJobModal id={id} hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

RunJobMenuItem.propTypes = {
    id: string.isRequired,
}

export default RunJobMenuItem
