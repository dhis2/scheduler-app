import React, { useCallback } from 'react'
import {
    Box,
    ReactFinalForm,
    MultiSelectFieldFF,
    Help,
    Transfer,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import styles from './TransferField.module.css'
import TransferFF from './TransferFF'
import { useDataQuery } from '@dhis2/app-runtime'

const { Field, useFormState, useForm } = ReactFinalForm

const queries = {
    programs: {
        resource: 'programs',
        params: {
            paging: true,
            pageSize: 5,
        },
    },
}

const PaginatedTransfer = ({
    name,
    parameterName,
    parameterProps,
    query,
    resource,
    ...rest
}) => {
    const optionsFetch = useDataQuery(query)

    console.log({optionsFetch})
    console.log(optionsFetch.data?.[resource])
    const options = optionsFetch.data?.[resource]?.[resource].map(opt => ({
        value: opt.id,
        label: opt.displayName,
    })) ?? []

    console.log({options})

    const handleEndReached = () => {
        console.log('END REACH')
    }
    return (
        <TransferFF
            {...rest}
            sourceEmptyPlaceHolder={
                <EmptyPlaceHolder loading={optionsFetch.loading} />
            }
            options={options}
            onEndReached={handleEndReached}
        />
    )
}

export default PaginatedTransfer

const EmptyPlaceHolder = ({ loading }) => (
    <CenteredContent>
        <CircularLoader />
    </CenteredContent>
)
