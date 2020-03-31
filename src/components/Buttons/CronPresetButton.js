import React, { useState } from 'react'
import { func } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { CronPresetModal } from '../Modal'

const CronPresetButton = ({ setCron }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button primary onClick={() => setShowModal(true)}>
                {i18n.t('Choose from preset times')}
            </Button>
            {showModal && (
                <CronPresetModal
                    hideModal={() => setShowModal(false)}
                    setCron={setCron}
                />
            )}
        </React.Fragment>
    )
}

CronPresetButton.propTypes = {
    setCron: func.isRequired,
}

export default CronPresetButton
