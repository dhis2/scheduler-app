import React from 'react'
import { func } from 'prop-types'
import { Card, Button } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { Title } from '../../components/Title'
import { LinkButton } from '../../components/Buttons'
import { Aligner } from '../../components/Aligner'
import { Info } from '../../components/Icons'
import {
    validators,
    JobName,
    CronExpression,
    JobType,
} from '../../components/Form'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = ({ createJob }) => (
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
            <Form
                onSubmit={values => createJob(values)}
                validate={() => {}}
                render={({ handleSubmit, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="name"
                            component={JobName}
                            validate={validators.requiredString}
                            label="Name"
                            type="text"
                        />
                        <Field
                            name="cronExpression"
                            component={CronExpression}
                            validate={validators.requiredCronExpression}
                            label="CRON Expression"
                            type="text"
                        />
                        <Field
                            name="jobType"
                            component={JobType}
                            validate={validators.requiredString}
                            label="Job Type"
                        />
                        <div>
                            <Button
                                primary
                                type="submit"
                                disabled={pristine || invalid}
                            >
                                Save job
                            </Button>
                            <Button>Cancel</Button>
                        </div>
                    </form>
                )}
            />
        </Card>
    </React.Fragment>
)

JobAdd.propTypes = {
    createJob: func.isRequired,
}

export default JobAdd
