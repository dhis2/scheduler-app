import React from 'react'
import { bool, func } from 'prop-types'
import { Card, Button } from '@dhis2/ui-core'
import { FORM_ERROR } from 'final-form'
import { FormSpy, Form } from 'react-final-form'
import { Title } from '../../components/Title'
import { Aligner } from '../../components/Aligner'
import { DiscardFormButton } from '../../components/Buttons'
import { Info } from '../../components/Icons'
import {
    validators,
    JobNameField,
    CronField,
    JobTypeField,
    ParameterField,
} from '../../components/Form'
import { InlineError } from '../../components/Errors'
import history from '../../services/history'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const validate = ({ name, cronExpression, jobType }) => ({
    name: validators.requiredString(name),
    cronExpression: validators.requiredCronExpression(cronExpression),
    jobType: validators.requiredString(jobType),
})

const JobAdd = ({ isPristine, setIsPristine, createJob }) => {
    const onSubmit = job =>
        createJob(job)
            .then(() => history.push('/'))
            .catch(error => ({ [FORM_ERROR]: error }))

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
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({
                        handleSubmit,
                        pristine,
                        submitError,
                        values,
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <FormSpy
                                    subscription={{ pristine: true }}
                                    onChange={({ pristine }) =>
                                        setIsPristine(pristine)
                                    }
                                />
                                <JobNameField />
                                <CronField />
                                <JobTypeField />
                                <ParameterField jobType={values.jobType} />
                                <div>
                                    {submitError && (
                                        <InlineError
                                            message={submitError.message}
                                            details={submitError.details}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Button
                                        primary
                                        type="submit"
                                        disabled={pristine}
                                    >
                                        Save job
                                    </Button>
                                    <DiscardFormButton
                                        shouldConfirm={!pristine}
                                    >
                                        Cancel
                                    </DiscardFormButton>
                                </div>
                            </form>
                        )
                    }}
                />
            </Card>
        </React.Fragment>
    )
}

JobAdd.propTypes = {
    isPristine: bool.isRequired,
    setIsPristine: func.isRequired,
    createJob: func.isRequired,
}

export default JobAdd
