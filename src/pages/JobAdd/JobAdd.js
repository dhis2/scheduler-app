import React from 'react'
import { Card } from '@dhis2/ui-core'
import { Title } from '../../components/Title'
import { Arrange } from '../../components/Arrange'

const JobAdd = () => (
    <React.Fragment>
        <Title priority={2}>New Job</Title>
        <Card>
            <Arrange>
                <Title priority={3}>Configuration</Title>
                Helptext
            </Arrange>
        </Card>
    </React.Fragment>
)

export default JobAdd
