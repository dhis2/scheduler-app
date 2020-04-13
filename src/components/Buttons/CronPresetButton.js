import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { CronPresetModal } from '../Modal'

const CronPresetButton = ({ setCron, small }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button onClick={() => setShowModal(true)} small={small}>
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

CronPresetButton.defaultProps = {
    small: false,
}

const { func, bool } = PropTypes

CronPresetButton.propTypes = {
    setCron: func.isRequired,
    small: bool,
}

export default CronPresetButton
