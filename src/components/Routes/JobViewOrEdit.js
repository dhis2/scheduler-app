import React from 'react'
import { NoticeBox } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { useJobById } from '../../hooks/jobs'
import { Spinner } from '../Spinner'
import JobEdit from '../../pages/JobEdit'
import JobView from '../../pages/JobView'

const JobViewOrEdit = () => {
    const { id } = useParams()
    const { data, fetching, error } = useJobById(id)

    if (fetching) {
        return <Spinner />
    }

    if (error) {
        return (
            <NoticeBox error title={i18n.t('Could not load requested job')}>
                {i18n.t(
                    'Something went wrong whilst loading the requested job. Make sure it has not been deleted and try refreshing the page.'
                )}
            </NoticeBox>
        )
    }

    const { configurable } = data

    if (configurable) {
        return <JobEdit job={data} />
    } else {
        return <JobView job={data} />
    }
}

export default JobViewOrEdit
