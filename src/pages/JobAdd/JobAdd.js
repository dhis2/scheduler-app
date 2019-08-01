import React from 'react'
import { bool, func } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Title } from '../../components/Title'
import { Aligner } from '../../components/Aligner'
import { DiscardFormButton } from '../../components/Buttons'
import { Info } from '../../components/Icons'
import { JobFormContainer } from '../../components/Forms'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = ({ isPristine, setIsPristine }) => {
    return (
        <React.Fragment>
            <DiscardFormButton shouldConfirm={!isPristine}>
                Back to all jobs
            </DiscardFormButton>
            <Title priority={2}>New Job</Title>
            <Card>
                <Aligner>
                    <Title priority={3}>Configuration</Title>
                    <Info />
                    <a href={infoLink}>About job configuration</a>
                </Aligner>
                <JobFormContainer setIsPristine={setIsPristine} />
            </Card>
        </React.Fragment>
    )
}

JobAdd.propTypes = {
    isPristine: bool.isRequired,
    setIsPristine: func.isRequired,
}

export default JobAdd
