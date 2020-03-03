import React, { useState } from 'react'
import { Card } from '@dhis2/ui-core'
import { Title } from '../../components/Title'
import { Arrange } from '../../components/Arrange'
import { DiscardFormButton } from '../../components/Buttons'
import { Info } from '../../components/Icons'
import { JobFormContainer } from '../../components/Forms'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = () => {
    const [isPristine, setIsPristine] = useState(true)

    return (
        <React.Fragment>
            <DiscardFormButton shouldConfirm={!isPristine}>
                Back to all jobs
            </DiscardFormButton>
            <Title priority={2}>New Job</Title>
            <Card>
                <Arrange>
                    <Title priority={3}>Configuration</Title>
                    <Info />
                    <a href={infoLink}>About job configuration</a>
                </Arrange>
                <JobFormContainer setIsPristine={setIsPristine} />
            </Card>
        </React.Fragment>
    )
}

export default JobAdd
