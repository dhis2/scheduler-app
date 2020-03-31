import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    userSettings: {
        resource: 'userSettings',
    },
}

const useGetUserSettings = () => {
    const { loading, error, data } = useDataQuery(query)

    if (data && data.userSettings) {
        return { loading, error, data: data.userSettings }
    }

    return { loading, error, data }
}

export default useGetUserSettings

/**
 * Selectors
 */

export const getLocale = data => {
    const { keyUiLocale } = data

    if (!keyUiLocale) {
        return ''
    }

    return keyUiLocale
}
