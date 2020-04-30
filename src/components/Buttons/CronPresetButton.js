import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
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
    setCron: PropTypes.func.isRequired,
}

export default CronPresetButton
