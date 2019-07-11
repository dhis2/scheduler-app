import React from 'react'
import { Card, InputField, SelectField, Button } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { LinkButton } from '../../components/Buttons'
import { Aligner } from '../../components/Aligner'
import { Info } from '../../components/Icons'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = () => (
    <React.Fragment>
        <LinkButton as={Link} to="/">
            Back to all jobs
        </LinkButton>
        <Title priority={2}>New Job</Title>
        <Card>
            <Aligner>
                <Title priority={3}>Configuration</Title>
                <Info />
                <a href={infoLink}>About job configuration</a>
            </Aligner>
            <InputField label="Name" type="text" />
            <SelectField label="Frequency">
                <option value="0">Continuous execution</option>
            </SelectField>
            <SelectField label="Job type">
                <option value="0">Monitoring</option>
            </SelectField>
            <Button primary>Save job</Button>
            <Button>Cancel</Button>
        </Card>
    </React.Fragment>
)

export default JobAdd
