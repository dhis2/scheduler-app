import { useDataQuery } from '@dhis2/app-runtime'
import { getLocale } from './selectors'

const fallback = 'en'

const query = {
    userSettings: {
        resource: 'userSettings',
    },
}

const useLocale = () => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) {
        return ''
    }

    // Fall back to 'en' in case of errors
    if (error) {
        return fallback
    }

    return getLocale(data.userSettings) || fallback
}

export default useLocale
