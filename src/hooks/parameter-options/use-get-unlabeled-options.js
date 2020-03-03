import { useDataEngine } from '@dhis2/app-runtime'
import { useState, useEffect } from 'react'

const useGetUnlabeledOptions = ({ endpoint }) => {
    const engine = useDataEngine()
    const [response, setResponse] = useState({
        loading: true,
        error: undefined,
        data: undefined,
    })

    useEffect(() => {
        const query = {
            options: {
                resource: endpoint,
                params: {
                    paging: false,
                },
            },
        }
        const abortController = new AbortController()
        const signal = abortController.signal

        engine
            .query(query, { signal })
            .then(({ options }) => {
                setResponse({
                    loading: false,
                    error: undefined,
                    data: options,
                })
            })
            .catch(error => {
                const isAbortError = error.name === 'AbortError'

                // Only set the error if it's not an abort error
                if (!isAbortError) {
                    setResponse({
                        loading: false,
                        error,
                        data: undefined,
                    })
                }
            })
    }, [engine, endpoint])

    return response
}

export default useGetUnlabeledOptions
