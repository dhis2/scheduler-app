import cronstrue from 'cronstrue/i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { validateCron } from '../../services/validators'
import { getLocale } from './selectors'

const query = {
    userSettings: {
        resource: 'userSettings',
    },
}

const useHumanReadableCron = cron => {
    const { loading, error, data } = useDataQuery(query)
    const isValid = cron && validateCron(cron)

    if (loading || !isValid) {
        return ''
    }

    // Fall back to default locale in case of errors (English for cronstrue)
    if (error) {
        return cronstrue.toString(cron)
    }

    const locale = getLocale(data.userSettings)

    return cronstrue.toString(cron, { locale })
}

export default useHumanReadableCron
