import { FORM_ERROR } from 'final-form'
import fetchy from '../fetchy'
import endpoints from '../endpoints'

const createJob = async job => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(job),
    }

    try {
        await fetchy(endpoints.jobs, fetchOptions)
    } catch (error) {
        return { [FORM_ERROR]: error }
    }
}

export default createJob
