import React from 'react'
import { Card, InputField, SelectField, Button } from '@dhis2/ui-core'
import { Title } from '../../components/Title'
import { Info } from '../../components/Icons'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = () => (
    <React.Fragment>
        <Title priority={2}>New Job</Title>
        <Card>
            <Title priority={3}>Configuration</Title>
            <Info />
            <a href={infoLink}>About job configuration</a>
            <InputField label="Name" type="text" />
            <SelectField label="Frequency">
                <option value="0">Continuous execution</option>
            </SelectField>
            <SelectField label="Job type">
                <option value="0">Monitoring</option>
            </SelectField>
            <Button primary>Save job</Button>
            <Button>Cancel</Button>
            <Button destructive>Delete job</Button>
        </Card>
    </React.Fragment>
)

export default JobAdd
