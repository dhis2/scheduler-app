import React from 'react'
import { Card, Button } from '@dhis2/ui-core'
import { Form, Field } from 'react-final-form'
import { Title } from '../../components/Title'
import { Aligner } from '../../components/Aligner'
import { Info } from '../../components/Icons'
import {
    validators,
    JobName,
    CronExpression,
    JobType,
} from '../../components/Form'
import { InlineError } from '../../components/Errors'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const validate = ({ name, cronExpression, jobType }) => ({
    name: validators.requiredString(name),
    cronExpression: validators.requiredCronExpression(cronExpression),
    jobType: validators.requiredString(jobType),
})

const JobAdd = () => (
    <React.Fragment>
        <Title priority={2}>New Job</Title>
        <Card>
            <Aligner>
                <Title priority={3}>Configuration</Title>
                <Info />
                <a href={infoLink}>About job configuration</a>
            </Aligner>
            <Form
                onSubmit={() => {}}
                validate={validate}
                render={({ handleSubmit, pristine, submitError }) => (
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
                            {submitError && (
                                <InlineError
                                    message={submitError.message}
                                    details={submitError.details}
                                />
                            )}
                        </div>
                        <div>
                            <Button primary type="submit" disabled={pristine}>
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

export default JobAdd
