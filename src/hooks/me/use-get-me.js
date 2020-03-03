import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    me: {
        resource: 'me',
    },
}

const useGetMe = () => {
    const { loading, error, data, refetch } = useDataQuery(query)

    if (data && data.me) {
        return { loading, error, refetch, data: data.me }
    }

    return { loading, error, refetch, data }
}

export default useGetMe

/**
 * Selectors
 */

export const getAuthorized = me => {
    const { authorities } = me

    if (!authorities) {
        return false
    }

    const isAuthorized =
        authorities.includes('ALL') ||
        authorities.includes('F_SCHEDULING_ADMIN')

    return isAuthorized
}
