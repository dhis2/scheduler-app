import { useDataQuery } from '@dhis2/app-runtime'
import { useFeatureToggle } from '../featureToggle'

const query = {
    skipTableTypes: {
        resource: 'analytics/tableTypes',
    },
    validationRuleGroups: {
        resource: 'validationRuleGroups',
        params: {
            paging: false,
        },
    },
    predictors: {
        resource: 'predictors',
        params: {
            paging: false,
        },
    },
    predictorGroups: {
        resource: 'predictorGroups',
        params: {
            paging: false,
        },
    },
    dataIntegrityChecks: {
        resource: 'dataIntegrity',
    },
    dashboard: {
        resource: 'dashboards',
    },
    receivers: {
        resource: 'userGroups',
    },
    programs: {
        resource: 'programs',
    },
}

const queryWithPushAnalysis = {
    ...query,
    pushAnalysis: {
        resource: 'pushAnalysis',
        params: {
            paging: false,
        },
    },
}

const useParameterOptions = () => {
    const { showPushAnalysis } = useFeatureToggle()
    const fetch = useDataQuery(showPushAnalysis ? queryWithPushAnalysis : query)

    // Remove nesting from data
    if (fetch.data) {
        const skipTableTypes = fetch.data?.skipTableTypes
        const validationRuleGroups =
            fetch.data?.validationRuleGroups?.validationRuleGroups
        const pushAnalysis = fetch.data?.pushAnalysis?.pushAnalysis
        const predictors = fetch.data?.predictors?.predictors
        const predictorGroups = fetch.data?.predictorGroups?.predictorGroups
        const dataIntegrityChecks = fetch.data?.dataIntegrityChecks
        const dashboard = fetch.data?.dashboard?.dashboards
        const receivers = fetch.data?.receivers?.userGroups
        const skipPrograms = fetch.data?.programs?.programs

        if (
            !skipTableTypes ||
            !validationRuleGroups ||
            !predictors ||
            !predictorGroups ||
            !dataIntegrityChecks ||
            !dashboard ||
            !receivers ||
            !skipPrograms ||
            (showPushAnalysis ? !pushAnalysis : false)
        ) {
            const error = new Error(
                'Did not receive the expected parameter options'
            )
            return { ...fetch, error, data: undefined }
        }

        const data = {
            skipTableTypes,
            validationRuleGroups,
            predictors,
            predictorGroups,
            dataIntegrityChecks,
            dashboard,
            receivers,
            skipPrograms,
        }

        if (showPushAnalysis) {
            data.pushAnalysis = pushAnalysis
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useParameterOptions
