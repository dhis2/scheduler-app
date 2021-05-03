import { useQuery } from 'react-query'

export default function useJob(id) {
    return useQuery([
        {
            job: {
                resource: 'jobConfigurations',
                params: {
                    fields: '*',
                    paging: false,
                },
                id,
            },
        },
    ])
}
